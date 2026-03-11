import { PartialType } from '@nestjs/mapped-types';
import { CreateTransfersDuringServiceDto } from './create-transfers-during-service.dto';

export class UpdateTransfersDuringServiceDto extends PartialType(
  CreateTransfersDuringServiceDto,
) {}
