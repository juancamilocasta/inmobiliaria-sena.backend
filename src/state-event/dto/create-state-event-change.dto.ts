import { IsNumber, IsString } from 'class-validator';

export class CreateStateEventChangeDto {
  @IsString()
  readonly idEvent: string;

  @IsNumber()
  readonly idStateEvent: number;
}
