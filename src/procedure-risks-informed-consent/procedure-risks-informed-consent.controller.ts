import { Controller, Post, Body } from '@nestjs/common';
import { ProcedureRisksInformedConsentService } from './procedure-risks-informed-consent.service';
import { CreateProcedureRisksInformedConsentDto } from './dto/create-procedure-risks-informed-consent.dto';

@Controller('procedure-risks-informed-consent')
export class ProcedureRisksInformedConsentController {
  constructor(
    private readonly procedureRisksInformedConsentService: ProcedureRisksInformedConsentService,
  ) {}

  @Post()
  create(
    @Body()
    createProcedureRisksInformedConsentDto: CreateProcedureRisksInformedConsentDto,
  ) {
    return this.procedureRisksInformedConsentService.create(
      createProcedureRisksInformedConsentDto,
    );
  }
}
