import { Controller, Get } from '@nestjs/common';
import { VinculationType } from './entities/vinculation-type.entity';
import { VinculationTypesService } from './vinculation-types.service';

@Controller('vinculation-types')
export class VinculationTypesController {
  constructor(
    private readonly vinculationTypesService: VinculationTypesService,
  ) {}

  @Get()
  getAllVinculationTypes(): Promise<VinculationType[]> {
    return this.vinculationTypesService.getAllVinculationTypes();
  }
}
