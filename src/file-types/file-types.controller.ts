import { Controller, Get } from '@nestjs/common';
import { FileTypesService } from './file-types.service';

@Controller('file-types')
export class FileTypesController {
  constructor(private readonly fileTypesService: FileTypesService) {}

  @Get()
  findAllFileTypes() {
    return this.fileTypesService.findAllFileTypes();
  }
}
