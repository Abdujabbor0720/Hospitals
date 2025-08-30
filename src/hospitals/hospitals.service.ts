import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hospital } from './entities/hospital.entity';
import { Repository } from 'typeorm';
import { handleError } from 'src/utils/handleError';
import { resSuccess } from 'src/utils/resSuccess';

@Injectable()
export class HospitalsService {
  constructor(
    @InjectRepository(Hospital) private hospitalRepo: Repository<Hospital>,
  ) { }

  async create(createHospitalDto: CreateHospitalDto) {
    try {
      const newHospital = await this.hospitalRepo.save(createHospitalDto);
      return resSuccess(newHospital, 201);
    } catch (error) {
      handleError(error);
    }
  }

  async findAll() {
    try {
      const hospitals = await this.hospitalRepo.find({
        relations: ['locations'],
        order: { created_at: 'DESC' },
      });
      return resSuccess(hospitals);
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const hospital = await this.hospitalRepo.findOne({
        where: { id },
        relations: ['locations'],
      });
      if (!hospital) {
        throw new NotFoundException(`Hospital not found!`);
      }
      return resSuccess(hospital);
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: number, updateHospitalDto: UpdateHospitalDto) {
    try {
      await this.hospitalRepo.update(id, updateHospitalDto);
      const hospital = await this.hospitalRepo.findOne({
        where: { id },
      });
      if (!hospital) {
        throw new NotFoundException(`Hospital not found!`);
      }
      return resSuccess(hospital);
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const hospital = await this.hospitalRepo.findOne({
        where: { id },
      });
      if (!hospital) {
        throw new NotFoundException(`Hospital not found!`);
      }
      await this.hospitalRepo.delete({ id });
      return resSuccess({});
    } catch (error) {
      handleError(error);
    }
  }
}
