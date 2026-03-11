import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ContractingClientService } from './contracting-clients.service';
import { CreateContractingClientDto } from './dto/create-contracting-client.dto';

@Controller('contracting-client')
export class ContractingClientController {
  constructor(
    private readonly contractingClientService: ContractingClientService,
  ) {}
  @Post()
  createContractingClient(
    @Body() createContractingClientDto: CreateContractingClientDto,
  ) {
    return this.contractingClientService.createContractingClient(
      createContractingClientDto,
    );
  }

  @Get()
  getAllContractingClient() {
    return this.contractingClientService.getAllContractingClient();
  }

  @Post(':idContractingClient')
  updateContractingClient(
    @Param('idContractingClient') idContractingClient: number,
    @Body() updateContractingClientDto,
  ) {
    return this.contractingClientService.updateContractingClient(
      idContractingClient,
      updateContractingClientDto,
    );
  }
}
