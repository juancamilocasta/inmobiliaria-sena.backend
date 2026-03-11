import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalServicesDto } from './create-medical-services.dto';

export class UpdateMedicalServicesDto extends PartialType(
  CreateMedicalServicesDto,
) {}
