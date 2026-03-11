import { Controller, Get } from '@nestjs/common';
import { PersonTypesService } from './person-types.service';

@Controller('person-types')
export class PersonTypesController {
  constructor(private readonly personTypesService: PersonTypesService) {}

  @Get()
  getAllPersonTypes() {
    return this.personTypesService.getAllPersonTypes();
  }
}
