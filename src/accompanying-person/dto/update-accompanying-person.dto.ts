import { PartialType } from '@nestjs/mapped-types';
import { CreateAccompanyingPersonDto } from './create-accompanying-person.dto';
import { IsNumber } from 'class-validator';

export class UpdateAccompanyingPersonDto extends PartialType(
  CreateAccompanyingPersonDto,
) {
  @IsNumber()
  readonly idAccompanyingPerson: number;
}
