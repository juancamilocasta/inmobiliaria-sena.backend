import { Controller } from '@nestjs/common';
import { AssemblyRipsService } from './assembly-rips.service';

@Controller('assembly-rips')
export class AssemblyRipsController {
  constructor(private readonly assemblyRipsService: AssemblyRipsService) {}
  @Get
}
