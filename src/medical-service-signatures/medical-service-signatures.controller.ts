import { Controller, Post, Body, Req } from '@nestjs/common';
import { MedicalServiceSignaturesService } from './medical-service-signatures.service';
import { CreateMedicalServiceSignatureDto } from './dto/create-medical-service-signature.dto';

@Controller('medical-service-signatures')
export class MedicalServiceSignaturesController {
  constructor(
    private readonly medicalServiceSignaturesService: MedicalServiceSignaturesService,
  ) {}

  @Post()
  create(
    @Body() createMedicalServiceSignatureDto: CreateMedicalServiceSignatureDto,
    @Req() req,
  ) {
    const { user } = req;
    return this.medicalServiceSignaturesService.create(
      createMedicalServiceSignatureDto,
      user.idUser,
    );
  }
}
