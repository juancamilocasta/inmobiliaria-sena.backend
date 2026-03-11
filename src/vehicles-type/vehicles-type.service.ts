import { Injectable } from '@nestjs/common';
import { VehiclesType } from './entities/vehicles-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VehiclesTypeService {
  constructor(
    @InjectRepository(VehiclesType)
    private readonly vehiclesTypeRepository: Repository<VehiclesType>,
  ) {}

  async findAll() {
    const vehiclesType = await this.vehiclesTypeRepository.find();
    return vehiclesType;
  }
}
