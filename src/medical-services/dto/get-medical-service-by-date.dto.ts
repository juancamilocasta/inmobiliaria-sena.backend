import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class GetMedicalServiceByDateDto {
  @IsDate()
  @Type(() => Date)
  readonly dateProgrammed: Date;
}
