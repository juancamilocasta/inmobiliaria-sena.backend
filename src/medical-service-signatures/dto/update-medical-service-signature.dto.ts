import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalServiceSignatureDto } from './create-medical-service-signature.dto';

export class UpdateMedicalServiceSignatureDto extends PartialType(
  CreateMedicalServiceSignatureDto,
) {}
