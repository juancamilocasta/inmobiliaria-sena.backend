import { Body, Controller, Get, Post } from '@nestjs/common';
import { EpsService } from './eps.service';
import { CreateEpsDto } from './dto/create-eps.dto';

@Controller('eps')
export class EpsController {
  constructor(private readonly epsService: EpsService) {}
  @Post()
  createEps(@Body() createEpsDto: CreateEpsDto) {
    return this.epsService.createEps(createEpsDto);
  }
  @Get()
  getEps() {
    return this.epsService.getAllEps();
  }
}
