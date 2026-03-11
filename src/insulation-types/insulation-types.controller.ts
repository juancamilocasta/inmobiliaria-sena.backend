import { Controller, Get } from '@nestjs/common';
import { InsulationTypesService } from './insulation-types.service';

@Controller('insulation-types')
export class InsulationTypesController {
  constructor(
    private readonly insulationTypesService: InsulationTypesService,
  ) {}

  @Get()
  findAll() {
    return this.insulationTypesService.findAll();
  }
}
