import { IsOptional, IsString } from 'class-validator';

export class CreatePhysicalExaminationDto {
  @IsString()
  idMedicalRecord: string;
  @IsString()
  @IsOptional()
  hourExam?: string;
  @IsString()
  @IsOptional()
  heartRate?: string;
  @IsString()
  @IsOptional()
  glucose?: string;
  @IsString()
  @IsOptional()
  respiratoryRate?: string;
  @IsString()
  @IsOptional()
  PA?: string;
  @IsString()
  @IsOptional()
  temperature?: string;
  @IsString()
  @IsOptional()
  glasgowRO?: string;
  @IsString()
  @IsOptional()
  glasgowRV?: string;
  @IsString()
  @IsOptional()
  glasgowRM?: string;
  @IsString()
  @IsOptional()
  saturation?: string;
}
