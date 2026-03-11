import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PhysicalExaminationService } from './physical-examination.service';
import { CreatePhysicalExaminationDto } from './dto/create-physical-examination.dto';
import { UpdatePhysicalExaminationDto } from './dto/update-physical-examination.dto';

@Controller('physical-examination')
export class PhysicalExaminationController {
  constructor(
    private readonly physicalExaminationService: PhysicalExaminationService,
  ) {}

  @Post()
  createPhysicalExamination(
    @Body() createPhysicalExaminationDto: CreatePhysicalExaminationDto,
  ) {
    return this.physicalExaminationService.createPhysicalExamination(
      createPhysicalExaminationDto,
    );
  }
  @Post('/:idPhysicalExamination')
  updatePhysicalExamination(
    @Param('idPhysicalExamination') idPhysicalExamination: string,
    @Body() createPhysicalExaminationDto: UpdatePhysicalExaminationDto,
  ) {
    return this.physicalExaminationService.updatePhysicalExamination(
      idPhysicalExamination,
      createPhysicalExaminationDto,
    );
  }
  @Get('/:idMedicalRecord')
  getPhysicalExaminationByIdMedicalRecord(
    @Param('idMedicalRecord') idMedicalRecord: string,
  ) {
    return this.physicalExaminationService.getPhysicalExaminationByIdMedicalRecord(
      idMedicalRecord,
    );
  }
  @Post('delete/:idPhysicalExamination')
  deletePhysicalExamination(
    @Param('idPhysicalExamination') idPhysicalExamination: string,
  ) {
    return this.physicalExaminationService.deletePhysicalExamination(
      idPhysicalExamination,
    );
  }
}
