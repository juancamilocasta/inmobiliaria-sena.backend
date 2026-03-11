import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MedicalServicesService } from './medical-services.service';
import { CreateMedicalServicesDto } from './dto/create-medical-services.dto';
import { GetMedicalServiceByDateRangeDto } from './dto/get-medical-service-by-date-range.dto';
import { UpdateMedicalServicesDto } from './dto/update-medical-services.entity';
import { GetMedicalServiceByDateDto } from './dto/get-medical-service-by-date.dto';
import { GetMedicalServicePaginatorDto } from './dto/get-medical-service-paginator.dto';

@Controller('medical-services')
export class MedicalServiceController {
  constructor(private readonly medicalServicesService: MedicalServicesService) {
    console.log('MedicalServiceController');
  }

  @Post()
  createMedicalService(@Body() createMedicalDto: CreateMedicalServicesDto) {
    return this.medicalServicesService.createMedicalServices(createMedicalDto);
  }

  @Post('update/:idMedicalService')
  updateMedicalService(
    @Param('idMedicalService') idMedicalService: string,
    @Body() updateMedicalDto: UpdateMedicalServicesDto,
  ) {
    return this.medicalServicesService.updateMedicalServices(
      idMedicalService,
      updateMedicalDto,
    );
  }

  @Get('get-medical-services')
  getMedicalServices() {
    return this.medicalServicesService.getMedicalServices();
  }
  @Post('get-medical-service-by-date-range')
  getMedicalServiceByDateRange(
    @Body() getMedicalServiceByDateRangeDto: GetMedicalServiceByDateRangeDto,
  ) {
    return this.medicalServicesService.getMedicalServiceByDateRange(
      getMedicalServiceByDateRangeDto,
    );
  }

  @Post('get-medical-service-by-date/')
  getMedicalServiceByDate(
    @Body() getMedicalServiceByDateDto: GetMedicalServiceByDateDto,
  ) {
    return this.medicalServicesService.getMedicalServiceByDate(
      getMedicalServiceByDateDto,
    );
  }

  @Post('get-medical-services-paginator')
  getMedicalServicesPaginator(
    @Body() getMedicalServicePaginatorDto: GetMedicalServicePaginatorDto,
  ) {
    console.log('acá');

    return this.medicalServicesService.getMedicalServicePaginator(
      getMedicalServicePaginatorDto,
    );
  }
}
