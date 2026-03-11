import { Controller, Post, Body } from '@nestjs/common';
import { PatientEventRegisterService } from './patient-event-register.service';
import { CreatePatientEventRegisterDto } from './dto/create-patient-event-register.dto';

@Controller('patient-event-register')
export class PatientEventRegisterController {
  constructor(
    private readonly patientEventRegisterService: PatientEventRegisterService,
  ) {}

  @Post()
  createPatientEventRegister(
    @Body() createPatientEventRegisterDto: CreatePatientEventRegisterDto,
  ) {
    return this.patientEventRegisterService.createPatientEventRegister(
      createPatientEventRegisterDto,
    );
  }
}
