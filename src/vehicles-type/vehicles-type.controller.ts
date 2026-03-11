import { Controller, Get } from '@nestjs/common';
import { VehiclesTypeService } from './vehicles-type.service';

@Controller('vehicles-type')
export class VehiclesTypeController {
  constructor(private readonly vehiclesTypeService: VehiclesTypeService) {}

  @Get()
  findAll() {
    return this.vehiclesTypeService.findAll();
  }
}
