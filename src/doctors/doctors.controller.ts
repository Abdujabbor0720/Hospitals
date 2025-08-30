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
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/entities/auth-user.entity';
import { GetUser } from '../auth/decorators/get-user.decorator';

@ApiTags('Doctors')
@Controller('doctors')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) { }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Create new doctor',
    description: 'Create a new doctor record (Admin only)'
  })
  @ApiResponse({
    status: 201,
    description: 'Doctor created successfully',
    schema: {
      example: {
        statusCode: 201,
        message: 'Success',
        data: {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@hospital.com',
          phone_number: '+998901234567',
          specialization: 'Cardiology',
          phone_number_2: '+998907654321',
          license_number: 'LIC-123456',
          experience: 5,
          working_hours: '09:00-17:00'
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.STAFF)
  @ApiOperation({
    summary: 'Get all doctors',
    description: 'Retrieve list of all doctors with their departments, salaries, and appointments'
  })
  @ApiResponse({
    status: 200,
    description: 'Doctors retrieved successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: [
          {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@hospital.com',
            phone_number: '+998901234567',
            specialization: 'Cardiology',
            departments: [
              { id: 1, name: 'Cardiology Department' }
            ],
            salaries: [
              { id: 1, amount: 1000000, bonus_amount: 100000 }
            ]
          }
        ]
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.STAFF)
  @ApiOperation({
    summary: 'Get doctor by ID',
    description: 'Retrieve a specific doctor by their ID with all related information'
  })
  @ApiParam({ name: 'id', description: 'Doctor ID', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Doctor retrieved successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@hospital.com',
          phone_number: '+998901234567',
          specialization: 'Cardiology',
          departments: [
            { id: 1, name: 'Cardiology Department' }
          ],
          salaries: [
            { id: 1, amount: 1000000, bonus_amount: 100000 }
          ]
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  @ApiOperation({
    summary: 'Update doctor',
    description: 'Update doctor information (Admin can update any doctor, Doctor can only update own profile)'
  })
  @ApiParam({ name: 'id', description: 'Doctor ID', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Doctor updated successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@hospital.com',
          phone_number: '+998901234567',
          specialization: 'Cardiology'
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Can only update own profile' })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto, @GetUser() user: any) {
    if (user.role === UserRole.DOCTOR && user.related_id !== +id) {
      throw new Error('You can only update your own profile');
    }
    return this.doctorsService.update(+id, updateDoctorDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Delete doctor',
    description: 'Delete a doctor record (Admin only)'
  })
  @ApiParam({ name: 'id', description: 'Doctor ID', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Doctor deleted successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: 'Doctor deleted successfully'
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(+id);
  }
}
