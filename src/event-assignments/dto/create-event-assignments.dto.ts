import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEventAssignmentsDto {
  @IsString()
  readonly idEvent: string;
  @IsOptional()
  @IsString()
  readonly idMedical: string = null;
  @IsOptional()
  @IsString()
  readonly idMedicalAssistant: string = null;
  @IsString()
  readonly idDriver: string;
  @IsNumber()
  readonly idVehicle: number;
}
