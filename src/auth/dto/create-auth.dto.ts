import { IsNumber, IsString } from 'class-validator';
export class CreateAuthDto {
  @IsString()
  token: string;
  @IsNumber()
  userId: number;
}
