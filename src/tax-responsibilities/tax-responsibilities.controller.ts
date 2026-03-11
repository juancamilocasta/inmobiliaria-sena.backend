import { Controller, Get } from '@nestjs/common';
import { TaxResponsibilitiesService } from './tax-responsibilities.service';

@Controller('tax-responsibilities')
export class TaxResponsibilitiesController {
  constructor(
    private readonly taxResponsibilitiesService: TaxResponsibilitiesService,
  ) {}

  @Get()
  findAllTaxResponsibilities() {
    return this.taxResponsibilitiesService.findAllTaxResponsibilities();
  }
}
