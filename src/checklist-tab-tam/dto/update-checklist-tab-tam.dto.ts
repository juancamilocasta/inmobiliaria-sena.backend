import { CreateChecklistTabTamDto } from './create-checklist-tab-tam.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateChecklistTabTamDto extends PartialType(
  CreateChecklistTabTamDto,
) {}
