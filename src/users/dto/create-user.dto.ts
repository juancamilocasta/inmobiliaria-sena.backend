import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly userName: string;
  @IsString()
  readonly lastName: string;
  @IsNumber()
  readonly idDocumentType: number;
  @IsString()
  readonly identification: string;
  @IsNumber()
  readonly idRole: number;
  @IsString()
  readonly password: string;
  @IsString()
  readonly phone: string;
  @IsOptional()
  @IsNumber()
  readonly isActive: number;
  @IsOptional()
  @IsString()
  readonly registrationNumber: string;
}
