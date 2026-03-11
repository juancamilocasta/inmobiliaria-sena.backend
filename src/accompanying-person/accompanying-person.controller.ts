import { Controller, Post, Body } from '@nestjs/common';
import { AccompanyingPersonService } from './accompanying-person.service';
import { CreateAccompanyingPersonDto } from './dto/create-accompanying-person.dto';
import { UpdateAccompanyingPersonDto } from './dto/update-accompanying-person.dto';

@Controller('accompanying-person')
export class AccompanyingPersonController {
  constructor(
    private readonly accompanyingPersonService: AccompanyingPersonService,
  ) {}

  @Post('create-accompanying-person')
  createAccompanyingPerson(
    @Body() createAccompanyingPersonDto: CreateAccompanyingPersonDto,
  ) {
    return this.accompanyingPersonService.createAccompanyingPerson(
      createAccompanyingPersonDto,
    );
  }

  @Post('update-accompanying-person')
  updateAccompanyingPerson(
    @Body() updateAccompanyingPersonDto: UpdateAccompanyingPersonDto,
  ) {
    return this.accompanyingPersonService.updateAccompanyingPerson(
      updateAccompanyingPersonDto,
    );
  }
}
