import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConcernsPatientInformedConsentController } from './concerns-patient-informed-consent.controller';
import { ConcernsPatientInformedConsentService } from './concerns-patient-informed-consent.service';
import { ConcernsPatientInformedConsent } from './entities/concerns-patient-informed-consent.entity';

@Module({
  controllers: [ConcernsPatientInformedConsentController],
  providers: [ConcernsPatientInformedConsentService],
  imports: [TypeOrmModule.forFeature([ConcernsPatientInformedConsent])],
  exports: [TypeOrmModule],
})
export class ConcernsPatientInformedConsentModule {}
