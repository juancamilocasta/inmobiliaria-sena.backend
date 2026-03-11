import { Controller, Get } from '@nestjs/common';
import { ClientTypesService } from './client-types.service';

@Controller('client-types')
export class ClientTypesController {
  constructor(private readonly clientTypesService: ClientTypesService) {}

  @Get()
  getAllClientTypes() {
    return this.clientTypesService.getAllClientTypes();
  }
}
