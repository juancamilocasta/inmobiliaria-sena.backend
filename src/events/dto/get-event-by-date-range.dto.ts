import { IsDate } from 'class-validator';

export class GetEventByDateRangeDto {
  @IsDate()
  readonly startDate: Date;

  @IsDate()
  readonly endDate: Date;
}
