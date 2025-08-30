import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { handleError } from 'src/utils/handleError';
import { resSuccess } from 'src/utils/resSuccess';
import { DoctorsService } from 'src/doctors/doctors.service';
import { PatientsService } from 'src/patients/patients.service';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,
    private doctorsService: DoctorsService,
    private patientsService: PatientsService,
  ) { }

  async create(createAppointmentDto: CreateAppointmentDto) {
    try {
      await this.doctorsService.findOne(createAppointmentDto.doctor_id);
      await this.patientsService.findOne(createAppointmentDto.patient_id);
      const newAppointment = await this.appointmentRepo.save(createAppointmentDto);
      return resSuccess(newAppointment, 201);
    } catch (error) {
      handleError(error);
    }
  }

  async findAll() {
    try {
      const appointments = await this.appointmentRepo.find({
        relations: { doctor: true, patient: true },
      });
      return resSuccess(appointments);
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const appointment = await this.appointmentRepo.findOne({
        where: { id },
        relations: { doctor: true, patient: true },
      });
      if (!appointment) {
        throw new NotFoundException(`Appointment not found!`);
      }
      return resSuccess(appointment);
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    try {
      await this.appointmentRepo.update(id, updateAppointmentDto);
      const appointment = await this.appointmentRepo.findOne({
        where: { id },
        relations: { doctor: true, patient: true },
      });
      if (!appointment) {
        throw new NotFoundException(`Appointment not found!`);
      }
      return resSuccess(appointment);
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const appointment = await this.appointmentRepo.findOne({
        where: { id },
        relations: { doctor: true, patient: true },
      });
      if (!appointment) {
        throw new NotFoundException(`Appointment not found!`);
      }
      await this.appointmentRepo.delete({ id });
    } catch (error) {
      handleError(error);
    }
  }
}
