import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MedicalRecordService } from './medical-record.service';
import { ApiBasicResponse } from 'src/interfaces/response-general-requests.model';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';

@Controller('medical-record')
export class MedicalRecordController {
  constructor(private readonly medicalRecordService: MedicalRecordService) {}
  @Get('create/:idMedicalService')
  createMedicalRecord(
    @Param('idMedicalService') idMedicalService: string,
  ): Promise<ApiBasicResponse> {
    return this.medicalRecordService.createMedicalRecord(idMedicalService);
  }
  @Get('/:idMedicalService')
  getMedicalRecordByIdMedicalService(
    @Param('idMedicalService') idMedicalService: string,
  ) {
    return this.medicalRecordService.getMedicalRecordByIdMedicalService(
      idMedicalService,
    );
  }
  @Post('/:idMedicalRecord')
  updateMedicalRecord(
    @Param('idMedicalRecord') idMedicalRecord: string,
    @Body() updateMedicalRecordDto: UpdateMedicalRecordDto,
  ) {
    return this.medicalRecordService.updateMedicalRecord(
      idMedicalRecord,
      updateMedicalRecordDto,
    );
  }
}
