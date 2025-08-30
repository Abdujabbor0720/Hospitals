import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { UpdateSalaryDto } from './dto/update-salary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Salary } from './entities/salary.entity';
import { Repository } from 'typeorm';
import { resSuccess } from 'src/utils/resSuccess';
import { handleError } from 'src/utils/handleError';
import { DoctorsService } from 'src/doctors/doctors.service';
import { StaffsService } from 'src/staffs/staffs.service';

@Injectable()
export class SalariesService {
  constructor(
    @InjectRepository(Salary) private salaryRepo: Repository<Salary>,
    private doctorService: DoctorsService,
    private staffService: StaffsService,
  ) { }

  async create(createSalaryDto: CreateSalaryDto) {
    try {
      if (createSalaryDto.staff_id && createSalaryDto.doctor_id) {
        throw new BadRequestException('Salary can be assigned to either doctor or staff, not both');
      }

      if (!createSalaryDto.staff_id && !createSalaryDto.doctor_id) {
        throw new BadRequestException('Either staff_id or doctor_id must be provided');
      }

      if (createSalaryDto.doctor_id) {
        await this.doctorService.findOne(createSalaryDto.doctor_id);
      }

      if (createSalaryDto.staff_id) {
        await this.staffService.findOne(createSalaryDto.staff_id);
      }

      const salaryData: any = {
        base_salary: createSalaryDto.base_salary,
        total_salary: createSalaryDto.total_salary,
      };

      if (createSalaryDto.doctor_id) {
        salaryData.doctor = { id: createSalaryDto.doctor_id };
      }

      if (createSalaryDto.staff_id) {
        salaryData.staff = { id: createSalaryDto.staff_id };
      }

      const newSalary = await this.salaryRepo.save(salaryData);
      return resSuccess(newSalary, 201);
    } catch (error) {
      handleError(error);
    }
  }

  async findAll() {
    try {
      const salaries = await this.salaryRepo.find({
        relations: { staff: true, doctor: true, bonuses: true },
      });
      return resSuccess(salaries);
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const salary = await this.salaryRepo.findOne({
        where: { id },
        relations: { staff: true, doctor: true, bonuses: true },
      });
      if (!salary) {
        throw new NotFoundException(`Salary not found!`);
      }
      return resSuccess(salary);
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: number, updateSalaryDto: UpdateSalaryDto) {
    try {
      if (updateSalaryDto.staff_id && updateSalaryDto.doctor_id) {
        throw new BadRequestException('Salary can be assigned to either doctor or staff, not both');
      }

      if (updateSalaryDto.doctor_id) {
        await this.doctorService.findOne(updateSalaryDto.doctor_id);
      }

      if (updateSalaryDto.staff_id) {
        await this.staffService.findOne(updateSalaryDto.staff_id);
      }

      const updateData: any = {};

      if (updateSalaryDto.base_salary !== undefined) {
        updateData.base_salary = updateSalaryDto.base_salary;
      }

      if (updateSalaryDto.total_salary !== undefined) {
        updateData.total_salary = updateSalaryDto.total_salary;
      }

      if (updateSalaryDto.doctor_id) {
        updateData.doctor = { id: updateSalaryDto.doctor_id };
        updateData.staff = null;
      }

      if (updateSalaryDto.staff_id) {
        updateData.staff = { id: updateSalaryDto.staff_id };
        updateData.doctor = null;
      }

      await this.salaryRepo.update(id, updateData);
      const salary = await this.salaryRepo.findOne({
        where: { id },
        relations: { staff: true, doctor: true },
      });
      if (!salary) {
        throw new NotFoundException(`Salary not found!`);
      }
      return resSuccess(salary);
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const salary = await this.salaryRepo.findOne({
        where: { id },
        relations: { staff: true, doctor: true },
      });
      if (!salary) {
        throw new NotFoundException(`Salary not found!`);
      }
      await this.salaryRepo.delete({ id });
      return resSuccess({ message: 'Salary deleted successfully' });
    } catch (error) {
      handleError(error);
    }
  }

  async findAllByUser(user: any) {
    try {
      let salaries;

      if (user.role === 'admin') {
        salaries = await this.salaryRepo.find({
          relations: { staff: true, doctor: true, bonuses: true },
        });
      } else if (user.role === 'doctor') {
        salaries = await this.salaryRepo.find({
          where: { doctor: { id: user.related_id } },
          relations: { staff: true, doctor: true, bonuses: true },
        });
      } else if (user.role === 'staff') {
        salaries = await this.salaryRepo.find({
          where: { staff: { id: user.related_id } },
          relations: { staff: true, doctor: true, bonuses: true },
        });
      } else {
        salaries = [];
      }

      return resSuccess(salaries);
    } catch (error) {
      handleError(error);
    }
  }

  async findOneByUser(id: number, user: any) {
    try {
      let whereCondition: any = { id };

      if (user.role === 'doctor') {
        whereCondition.doctor = { id: user.related_id };
      } else if (user.role === 'staff') {
        whereCondition.staff = { id: user.related_id };
      }

      const salary = await this.salaryRepo.findOne({
        where: whereCondition,
        relations: { staff: true, doctor: true, bonuses: true },
      });

      if (!salary) {
        throw new NotFoundException(`Salary not found or access denied!`);
      }

      return resSuccess(salary);
    } catch (error) {
      handleError(error);
    }
  }
}
