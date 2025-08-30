import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';
import { handleError } from 'src/utils/handleError';
import { resSuccess } from 'src/utils/resSuccess';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location) private locationRepo: Repository<Location>,
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    try {
      const newLocation = await this.locationRepo.save(createLocationDto);
      return resSuccess(newLocation, 201);
    } catch (error) {
      handleError(error);
    }
  }

  async findAll() {
    try {
      const locations = await this.locationRepo.find();
      return resSuccess(locations);
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const location = await this.locationRepo.findOne({
        where: { id },
      });
      if (!location) {
        throw new NotFoundException(`Location not found!`);
      }
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    try {
      await this.locationRepo.update(id, updateLocationDto);
      const location = await this.locationRepo.findOne({
        where: { id },
      });
      if (!location) {
        throw new NotFoundException(`Location not found!`);
      }
      return resSuccess(location);
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const location = await this.locationRepo.findOne({
        where: { id },
      });
      if (!location) {
        throw new NotFoundException(`Location not found!`);
      }
      await this.locationRepo.delete({ id });
      return resSuccess({});
    } catch (error) {
      handleError(error);
    }
  }
}
