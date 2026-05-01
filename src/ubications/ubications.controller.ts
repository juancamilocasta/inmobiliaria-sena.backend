import { Controller, Post, Body, Get } from '@nestjs/common';
import { UbicationsService } from './ubications.service';
import { CreateUbicationDto } from './dto/create-ubication.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('ubications')
export class UbicationsController {
  constructor(private readonly ubicationsService: UbicationsService) { }

  @Post()
  createUbication(@Body() createUbicationDto: CreateUbicationDto) {
    return this.ubicationsService.createUbication(createUbicationDto);
  }
  @Public()
  @Get('actives')
  findAllUbications() {
    return this.ubicationsService.getAllUbicationsActives();
  }
}
