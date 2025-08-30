import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBonusDto } from './dto/create-bonus.dto';
import { UpdateBonusDto } from './dto/update-bonus.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bonus } from './entities/bonus.entity';
import { Repository } from 'typeorm';
import { resSuccess } from 'src/utils/resSuccess';
import { handleError } from 'src/utils/handleError';
import { SalariesService } from 'src/salaries/salaries.service';

@Injectable()
export class BonusesService {
  constructor(@InjectRepository(Bonus) private bonusRepo: Repository<Bonus>,
    private salaryService: SalariesService,
  ) { }

  async create(createBonusDto: CreateBonusDto) {
    try {
      await this.salaryService.findOne(createBonusDto.salary_id);
      const newBonus = await this.bonusRepo.save(createBonusDto);
      return resSuccess(newBonus, 201);
    } catch (error) {
      handleError(error);
    }
  }

  async findAll() {
    try {
      const bonuses = await this.bonusRepo.find({
        relations: { salary: true }
      });
      return resSuccess(bonuses);
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const bonus = await this.bonusRepo.findOne({
        where: { id },
        relations: { salary: true },
      });
      if (!bonus) {
        throw new NotFoundException(`Bonus not found!`);
      }
      return resSuccess(bonus);
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: number, updateBonusDto: UpdateBonusDto) {
    try {
      await this.bonusRepo.update(id, updateBonusDto);
      const bonus = await this.bonusRepo.findOne({
        where: { id },
        relations: { salary: true },
      });
      if (!bonus) {
        throw new NotFoundException(`Bonus not found!`);
      }
      return resSuccess(bonus);
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const bonus = await this.bonusRepo.findOne({
        where: { id },
        relations: { salary: true },
      });
      if (!bonus) {
        throw new NotFoundException(`Bonus not found!`);
      }
      await this.bonusRepo.delete({ id });
      return resSuccess({});
    } catch (error) {
      handleError(error);
    }
  }
}
