import { Controller, Get } from '@nestjs/common';
import { ContractingClientsServicesService } from './contracting-clients-services.service';

@Controller('contracting-clients-services')
export class ContractingClientsServicesController {
  constructor(
    private readonly contractingClientsServicesService: ContractingClientsServicesService,
  ) {}

  @Get()
  getAllContractingClientService() {
    return this.contractingClientsServicesService.getAllContractingClientsService();
  }
}
