import { Controller, Post, Body, Req } from '@nestjs/common';
import { EventSignaturesService } from './event-signatures.service';
import { CreateEventSignatureDto } from './dto/create-event-signature.dto';

@Controller('event-signatures')
export class EventSignaturesController {
  constructor(
    private readonly eventSignaturesService: EventSignaturesService,
  ) {}

  @Post()
  create(@Body() createEventSignatureDto: CreateEventSignatureDto, @Req() req) {
    const { user } = req;
    return this.eventSignaturesService.create(
      createEventSignatureDto,
      user.idUser,
    );
  }
}
