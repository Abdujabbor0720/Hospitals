import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/entities/auth-user.entity';
import { GetUser } from '../auth/decorators/get-user.decorator';

@ApiTags('Patients')
@Controller('patients')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) { }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.STAFF)
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.STAFF, UserRole.PATIENT)
  findOne(@Param('id') id: string, @GetUser() user: any) {
    if (user.role === UserRole.PATIENT && user.related_id !== +id) {
      throw new ForbiddenException('You can only view your own information');
    }
    return this.patientsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.STAFF, UserRole.PATIENT)
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto, @GetUser() user: any) {
    if (user.role === UserRole.PATIENT && user.related_id !== +id) {
      throw new ForbiddenException('You can only update your own information');
    }
    return this.patientsService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }
}
