import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly userName: string;
  @IsString()
  readonly lastName: string;
  @IsString()
  readonly identification: string;
  @IsString()
  readonly password: string;
  @IsOptional()
  @IsNumber()
  readonly isActive: number;
}
