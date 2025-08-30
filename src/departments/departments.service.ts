import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { handleError } from 'src/utils/handleError';
import { resSuccess } from 'src/utils/resSuccess';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentRepo: Repository<Department>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    try {
      const newDepartment = await this.departmentRepo.save(createDepartmentDto);
      return resSuccess(newDepartment, 201);
    } catch (error) {
      handleError(error);
    }
  }

  async findAll() {
    try {
      const departments = await this.departmentRepo.find();
      return resSuccess(departments);
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const department = await this.departmentRepo.findOne({
        where: { id },
      });
      if (!department) {
        throw new NotFoundException(`Department not found!`);
      }
      return resSuccess(department);
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    try {
      await this.departmentRepo.update(id, updateDepartmentDto);
      const department = await this.departmentRepo.findOne({
        where: { id },
      });
      if (!department) {
        throw new NotFoundException(`Department not found!`);
      }
      return resSuccess(department);
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const department = await this.departmentRepo.findOne({
        where: { id },
      });
      if (!department) {
        throw new NotFoundException(`Department not found!`);
      }
      await this.departmentRepo.delete({ id });
      return resSuccess({});
    } catch (error) {
      handleError(error);
    }
  }
}
