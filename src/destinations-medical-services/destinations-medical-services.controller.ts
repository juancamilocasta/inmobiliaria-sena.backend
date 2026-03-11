import { Body, Controller, Post } from '@nestjs/common';
import { DestinationsMedicalServicesService } from './destinations-medical-services.service';
import { CreateDestinationsMedicalServiceDto } from './dto/create-destinations-medical-service.dto';

@Controller('destinations-medical-services')
export class DestinationsMedicalServicesController {
  constructor(
    private readonly destinationsMedicalServicesService: DestinationsMedicalServicesService,
  ) {}
  @Post()
  createDestinationMedicalService(
    @Body()
    createDestinationMedicalServiceDto: CreateDestinationsMedicalServiceDto,
  ) {
    return this.destinationsMedicalServicesService.createDestinationMedicalService(
      createDestinationMedicalServiceDto,
    );
  }
}
