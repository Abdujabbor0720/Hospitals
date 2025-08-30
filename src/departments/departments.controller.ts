import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/entities/auth-user.entity';

@ApiTags('Departments')
@Controller('departments')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) { }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Create new department',
    description: 'Create a new department (Admin only)'
  })
  @ApiResponse({
    status: 201,
    description: 'Department created successfully',
    schema: {
      example: {
        statusCode: 201,
        message: 'Success',
        data: {
          id: 1,
          name: 'Cardiology Department',
          description: 'Department for heart and cardiovascular diseases'
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.STAFF)
  @ApiOperation({
    summary: 'Get all departments',
    description: 'Retrieve list of all departments with their doctors'
  })
  @ApiResponse({
    status: 200,
    description: 'Departments retrieved successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: [
          {
            id: 1,
            name: 'Cardiology Department',
            description: 'Department for heart and cardiovascular diseases',
            doctors: [
              { id: 1, first_name: 'John', last_name: 'Doe', specialization: 'Cardiology' }
            ]
          }
        ]
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  findAll() {
    return this.departmentsService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.STAFF)
  @ApiOperation({
    summary: 'Get department by ID',
    description: 'Retrieve a specific department by ID with all related doctors'
  })
  @ApiParam({ name: 'id', description: 'Department ID', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Department retrieved successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: {
          id: 1,
          name: 'Cardiology Department',
          description: 'Department for heart and cardiovascular diseases',
          doctors: [
            { id: 1, first_name: 'John', last_name: 'Doe', specialization: 'Cardiology' }
          ]
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Department not found' })
  findOne(@Param('id') id: string) {
    return this.departmentsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Update department',
    description: 'Update department information (Admin only)'
  })
  @ApiParam({ name: 'id', description: 'Department ID', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Department updated successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: {
          id: 1,
          name: 'Cardiology Department',
          description: 'Department for heart and cardiovascular diseases'
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  @ApiResponse({ status: 404, description: 'Department not found' })
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentsService.update(+id, updateDepartmentDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Delete department',
    description: 'Delete a department (Admin only)'
  })
  @ApiParam({ name: 'id', description: 'Department ID', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Department deleted successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: 'Department deleted successfully'
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  @ApiResponse({ status: 404, description: 'Department not found' })
  remove(@Param('id') id: string) {
    return this.departmentsService.remove(+id);
  }
}
