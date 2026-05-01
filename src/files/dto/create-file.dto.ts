import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateFileDto {
  @IsString()
  @IsOptional()
  readonly idMedicalService: string;
  @IsNumber()
  readonly idFileType: number;
  @IsString()
  @IsOptional()
  readonly idEvent: string;
  @IsString()
  @IsOptional()
  readonly idPatientEventRegister: string;
  @IsString()
  @IsOptional()
  readonly idUser: string;
}
