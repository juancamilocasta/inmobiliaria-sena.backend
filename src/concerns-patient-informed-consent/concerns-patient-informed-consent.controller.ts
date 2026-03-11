import { Controller, Post, Body } from '@nestjs/common';
import { ConcernsPatientInformedConsentService } from './concerns-patient-informed-consent.service';
import { CreateConcernPatientInformedConsentDto } from './dto/create-concerns-patient-informed-consent.dto';

@Controller('concerns-patient-informed-consent')
export class ConcernsPatientInformedConsentController {
  constructor(
    private readonly concernsPatientInformedConsentService: ConcernsPatientInformedConsentService,
  ) {}

  @Post()
  create(
    @Body()
    createQuestionsPatientInformedConsentDto: CreateConcernPatientInformedConsentDto,
  ) {
    return this.concernsPatientInformedConsentService.createQuestionsPatientInformedConsent(
      createQuestionsPatientInformedConsentDto,
    );
  }
}
