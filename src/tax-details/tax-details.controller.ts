import { Controller, Get } from '@nestjs/common';
import { TaxDetailsService } from './tax-details.service';

@Controller('tax-details')
export class TaxDetailsController {
  constructor(private readonly taxDetailsService: TaxDetailsService) {}

  @Get()
  findAllTaxDetails(): Promise<any> {
    return this.taxDetailsService.findAllTaxDetails();
  }
}
