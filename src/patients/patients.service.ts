import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { handleError } from 'src/utils/handleError';
import { resSuccess } from 'src/utils/resSuccess';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient) private patientRepo: Repository<Patient>,
  ) { }

  async create(createPatientDto: CreatePatientDto) {
    try {
      const newPatient = await this.patientRepo.save(createPatientDto);
      return resSuccess(newPatient, 201);
    } catch (error) {
      handleError(error);
    }
  }

  async findAll() {
    try {
      const patients = await this.patientRepo.find({
        relations: ['appointments'],
      });
      return resSuccess(patients);
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const patient = await this.patientRepo.findOne({
        where: { id },
        relations: ['appointments'],
      });
      if (!patient) {
        throw new NotFoundException(`Patient not found!`);
      }
      return resSuccess(patient);
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    try {
      await this.patientRepo.update(id, updatePatientDto);
      const patient = await this.patientRepo.findOne({
        where: { id },
      });
      if (!patient) {
        throw new NotFoundException(`Patient not found!`);
      }
      return resSuccess(patient);
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const patient = await this.patientRepo.findOne({
        where: { id },
      });
      if (!patient) {
        throw new NotFoundException(`Patient not found!`);
      }
      await this.patientRepo.delete({ id });
      return resSuccess({});
    } catch (error) {
      handleError(error);
    }
  }
}
