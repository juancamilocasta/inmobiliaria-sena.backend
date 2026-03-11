import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class GetEventByDateDto {
  @IsDate()
  @Type(() => Date)
  readonly eventDate: Date;
}
