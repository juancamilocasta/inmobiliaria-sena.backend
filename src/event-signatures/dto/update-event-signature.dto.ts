import { PartialType } from '@nestjs/mapped-types';
import { CreateEventSignatureDto } from './create-event-signature.dto';

export class UpdateEventSignatureDto extends PartialType(
  CreateEventSignatureDto,
) {}
