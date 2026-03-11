import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateMedicalServiceSignatureDto {
  @IsUUID()
  readonly idMedicalService: string;
  @IsUUID()
  readonly signingUserId: string;
  @IsString()
  readonly password: string;
  @IsOptional()
  readonly active: number = 1;
}
