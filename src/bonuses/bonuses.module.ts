import { Module } from '@nestjs/common';
import { BonusesService } from './bonuses.service';
import { BonusesController } from './bonuses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bonus } from './entities/bonus.entity';
import { SalariesModule } from 'src/salaries/salaries.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bonus]), SalariesModule],
  controllers: [BonusesController],
  providers: [BonusesService],
})
export class BonusesModule {}
