import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { GetDataPatientByIdDto } from './dto/get-data-patient-by-id.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}
  @Post()
  createPatient(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.createPatient(createPatientDto);
  }
  @Post('/:idPatient')
  updatePatient(
    @Body() updatePatientDto: UpdatePatientDto,
    @Param('idPatient') idPatient: number,
  ) {
    return this.patientService.updatePatient(idPatient, updatePatientDto);
  }

  @Get()
  getPatient() {
    return this.patientService.getPatient();
  }
  @Get('/:idPatient')
  getDataPatientById(
    @Param('idPatient') getDataPatientByIdDto: GetDataPatientByIdDto,
  ) {
    return this.patientService.getDataPatientById(getDataPatientByIdDto);
  }

  @Get('document/:document')
  getDataPatientByDocument(@Param('document') document: string) {
    return this.patientService.getDataPatientByDocument(document);
  }
}
