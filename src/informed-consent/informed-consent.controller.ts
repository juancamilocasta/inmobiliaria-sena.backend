import { Controller, Post, Body, Param } from '@nestjs/common';
import { InformedConsentService } from './informed-consent.service';
import { CreateInformedConsentDto } from './dto/create-informed-consent.dto';
import { UpdateInformedConsentDto } from './dto/update-informed-consent.dto';

@Controller('informed-consent')
export class InformedConsentController {
  constructor(
    private readonly informedConsentService: InformedConsentService,
  ) {}

  @Post()
  create(@Body() createInformedConsentDto: CreateInformedConsentDto) {
    return this.informedConsentService.createInformedConsent(
      createInformedConsentDto,
    );
  }
  @Post(':idInformedConsent')
  update(
    @Param('idInformedConsent') idInformedConsent: number,
    @Body() updateInformedConsentDto: UpdateInformedConsentDto,
  ) {
    return this.informedConsentService.updateInformedConsent(
      idInformedConsent,
      updateInformedConsentDto,
    );
  }
}
