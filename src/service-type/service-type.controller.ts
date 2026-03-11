import { Controller, Get, Post } from '@nestjs/common';
import { ServiceTypeService } from './service-type.service';
import { CreateServiceTypeDto } from './dto/create-service-type.dto';

@Controller('service-type')
export class ServiceTypeController {
  constructor(private readonly serviceTypeService: ServiceTypeService) {}
  @Post()
  createServiceType(createServiceTypeDto: CreateServiceTypeDto) {
    return this.serviceTypeService.createServiceType(createServiceTypeDto);
  }

  @Get()
  getServiceType() {
    return this.serviceTypeService.getServiceType();
  }
}
