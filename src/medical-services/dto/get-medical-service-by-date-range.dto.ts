import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class GetMedicalServiceByDateRangeDto {
  @IsDate()
  @Type(() => Date)
  readonly startDate: Date;
  @IsDate()
  @Type(() => Date)
  readonly endDate: Date;
}
