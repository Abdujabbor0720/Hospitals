import { Module } from '@nestjs/common';
import { SalariesService } from './salaries.service';
import { SalariesController } from './salaries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salary } from './entities/salary.entity';
import { StaffsModule } from 'src/staffs/staffs.module';
import { DoctorsModule } from 'src/doctors/doctors.module';

@Module({
  imports: [TypeOrmModule.forFeature([Salary]), StaffsModule, DoctorsModule],
  controllers: [SalariesController],
  providers: [SalariesService],
  exports: [SalariesService],
})
export class SalariesModule { }
