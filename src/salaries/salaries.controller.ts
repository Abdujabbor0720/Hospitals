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
import { SalariesService } from './salaries.service';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { UpdateSalaryDto } from './dto/update-salary.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/entities/auth-user.entity';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('salaries')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SalariesController {
  constructor(private readonly salariesService: SalariesService) { }

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() createSalaryDto: CreateSalaryDto) {
    return this.salariesService.create(createSalaryDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.STAFF)
  findAll(@GetUser() user: any) {
    return this.salariesService.findAllByUser(user);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.STAFF)
  findOne(@Param('id') id: string, @GetUser() user: any) {
    return this.salariesService.findOneByUser(+id, user);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateSalaryDto: UpdateSalaryDto) {
    return this.salariesService.update(+id, updateSalaryDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.salariesService.remove(+id);
  }
}
