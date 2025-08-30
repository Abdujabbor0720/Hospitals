import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BonusesService } from './bonuses.service';
import { CreateBonusDto } from './dto/create-bonus.dto';
import { UpdateBonusDto } from './dto/update-bonus.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/entities/auth-user.entity';

@Controller('bonuses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BonusesController {
  constructor(private readonly bonusesService: BonusesService) { }

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() createBonusDto: CreateBonusDto) {
    return this.bonusesService.create(createBonusDto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.bonusesService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  findOne(@Param('id') id: string) {
    return this.bonusesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBonusDto: UpdateBonusDto) {
    return this.bonusesService.update(+id, updateBonusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bonusesService.remove(+id);
  }
}
