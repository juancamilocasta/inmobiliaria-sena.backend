import { PartialType } from '@nestjs/mapped-types';
import { CreateAssemblyRipDto } from './create-assembly-rip.dto';

export class UpdateAssemblyRipDto extends PartialType(CreateAssemblyRipDto) {}
