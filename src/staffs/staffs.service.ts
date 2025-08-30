import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { Repository } from 'typeorm';
import { handleError } from 'src/utils/handleError';
import { resSuccess } from 'src/utils/resSuccess';

@Injectable()
export class StaffsService {
  constructor(@InjectRepository(Staff) private staffRepo: Repository<Staff>) {}

  async create(createStaffDto: CreateStaffDto) {
    try {
      const newStaff = await this.staffRepo.save(createStaffDto);
      return resSuccess(newStaff, 201);
    } catch (error) {
      handleError(error);
    }
  }

  async findAll() {
    try {
      const staffs = await this.staffRepo.find();
      return resSuccess(staffs);
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const staff = await this.staffRepo.findOne({
        where: { id },
      });
      if (!staff) {
        throw new NotFoundException(`Staff not found!`);
      }
      return resSuccess(staff);
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: number, updateStaffDto: UpdateStaffDto) {
    try {
      await this.staffRepo.update(id, updateStaffDto);
      const staff = await this.staffRepo.findOne({
        where: { id },
      });
      if (!staff) {
        throw new NotFoundException(`Staff not found!`);
      }
      return resSuccess(staff);
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const staff = await this.staffRepo.findOne({
        where: { id },
      });
      if (!staff) {
        throw new NotFoundException(`Staff not found!`);
      }
      await this.staffRepo.delete({ id });
      return resSuccess({});
    } catch (error) {
      handleError(error);
    }
  }
}
