import { Body, Controller, Get, Post } from '@nestjs/common';
import { SupportsService } from './supports.service';
import { CreateSupportDto } from './dto/create-support.dto';

@Controller('supports')
export class SupportsController {
  constructor(private readonly supportsService: SupportsService) {}
  @Post()
  createSupport(@Body() createSupportDto: CreateSupportDto) {
    return this.supportsService.createSupport(createSupportDto);
  }
  @Get()
  getSupport() {
    return this.supportsService.getSupport();
  }
}
