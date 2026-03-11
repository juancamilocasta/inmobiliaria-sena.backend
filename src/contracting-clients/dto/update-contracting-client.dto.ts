import { PartialType } from '@nestjs/mapped-types';
import { CreateContractingClientDto } from './create-contracting-client.dto';
import { IsBoolean } from 'class-validator';

export class UpdateContractingClientDto extends PartialType(
  CreateContractingClientDto,
) {
  @IsBoolean()
  readonly active: boolean;
}
