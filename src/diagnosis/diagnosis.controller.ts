import { Body, Controller, Get, Post } from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';

@Controller('diagnosis')
export class DiagnosisController {
  constructor(private readonly diagnosisService: DiagnosisService) {}
  @Post()
  createDiagnosis(@Body() createDiagnosisDto: CreateDiagnosisDto) {
    return this.diagnosisService.createDiagnosis(createDiagnosisDto);
  }
  @Get()
  getDiagnosis() {
    return this.diagnosisService.getDiagnosis();
  }
}
