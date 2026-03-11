import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAssignmentDto {
  @IsString()
  readonly idMedicalService: string;
  @IsString()
  readonly idDriver: string;
  @IsOptional()
  @IsString()
  readonly idMedicalAssistant: string = null;
  @IsOptional()
  @IsString()
  readonly idMedical: string = null;
  @IsNumber()
  readonly idVehicle: number;
  @IsOptional()
  @IsDate()
  readonly dateProgrammed: Date;
}
