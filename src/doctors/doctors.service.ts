import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { handleError } from 'src/utils/handleError';
import { resSuccess } from 'src/utils/resSuccess';

@Injectable()
export class DoctorsService {
  constructor(@InjectRepository(Doctor) private doctorRepo: Repository<Doctor>) { }

  async create(createDoctorDto: CreateDoctorDto) {
    try {
      const newDoctor = await this.doctorRepo.save(createDoctorDto);
      return resSuccess(newDoctor, 201);
    } catch (error) {
      handleError(error);
    }
  }

  async findAll() {
    try {
      const doctors = await this.doctorRepo.find({
        relations: ['salaries', 'appointments', 'departments'],
      });
      return resSuccess(doctors);
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const doctor = await this.doctorRepo.findOne({
        where: { id },
        relations: ['salaries', 'appointments', 'departments'],
      });
      if (!doctor) {
        throw new NotFoundException(`Doctor not found!`);
      }
      return resSuccess(doctor);
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    try {
      await this.doctorRepo.update(id, updateDoctorDto);
      const doctor = await this.doctorRepo.findOne({
        where: { id },
        relations: ['salaries', 'appointments', 'departments', 'staffDepartments'],
      });
      if (!doctor) {
        throw new NotFoundException(`Doctor not found!`);
      }
      return resSuccess(doctor);
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const doctor = await this.doctorRepo.findOne({
        where: { id },
      });
      if (!doctor) {
        throw new NotFoundException(`Doctor not found!`);
      }
      await this.doctorRepo.delete({ id });
      return resSuccess({});
    } catch (error) {
      handleError(error);
    }
  }
}
