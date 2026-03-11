import { Controller, Get } from '@nestjs/common';
import { MunicipalityService } from './municipality.service';

@Controller('municipality')
export class MunicipalityController {
  constructor(private readonly municipalityService: MunicipalityService) {}
  @Get()
  getMunicipalities() {
    return this.municipalityService.getMunicipalities();
  }
}
