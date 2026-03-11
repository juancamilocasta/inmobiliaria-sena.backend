import { Body, Controller, Post, Req } from '@nestjs/common';
import { TechnicalServicesService } from './technical-services.service';
import { CreateTechnicalServicesDto } from './dto/create-technical-services.dto';

@Controller('technical-services')
export class TechnicalServicesController {
  constructor(
    private readonly technicalServicesService: TechnicalServicesService,
  ) {}
  @Post()
  createTechnicalService(
    @Body() createTechnicalServicesDto: CreateTechnicalServicesDto,
    @Req() req,
  ) {
    const dataForCreateTechnicalService = {
      ...createTechnicalServicesDto,
      idUser: req.user.idUser,
    };

    return this.technicalServicesService.createTechnicalService(
      dataForCreateTechnicalService,
    );
  }
}
