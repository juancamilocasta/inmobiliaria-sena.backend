import { Module } from '@nestjs/common';
import { InformedConsentService } from './informed-consent.service';
import { InformedConsentController } from './informed-consent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InformedConsent } from './entities/informed-consent.entity';

@Module({
  controllers: [InformedConsentController],
  providers: [InformedConsentService],
  imports: [TypeOrmModule.forFeature([InformedConsent])],
  exports: [TypeOrmModule],
})
export class InformedConsentModule {}
