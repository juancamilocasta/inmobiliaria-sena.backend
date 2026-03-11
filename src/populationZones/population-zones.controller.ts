import { Controller, Get } from '@nestjs/common';
import { PopulationZonesService } from './population-zones.service';

@Controller('population-zones')
export class PopulationZonesController {
  constructor(
    private readonly populationZonesService: PopulationZonesService,
  ) {}

  @Get()
  getAllPopulationZones() {
    return this.populationZonesService.getAllPopulationZones();
  }
}
