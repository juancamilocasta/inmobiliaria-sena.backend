import { Module } from '@nestjs/common';
import { ProcedureRisksInformedConsentService } from './procedure-risks-informed-consent.service';
import { ProcedureRisksInformedConsentController } from './procedure-risks-informed-consent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcedureRiskInformedConsent } from './entities/procedure-risks-informed-consent.entity';

@Module({
  controllers: [ProcedureRisksInformedConsentController],
  providers: [ProcedureRisksInformedConsentService],
  imports: [TypeOrmModule.forFeature([ProcedureRiskInformedConsent])],
  exports: [TypeOrmModule],
})
export class ProcedureRisksInformedConsentModule {}
