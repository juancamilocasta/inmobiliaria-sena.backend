import { IsNumber, IsString } from 'class-validator';

export class CreatePatientEventRegisterDto {
  @IsNumber()
  readonly idPatient: number;
  @IsNumber()
  readonly idDiagnosis: number;
  @IsString()
  readonly idEvent: string;
  @IsString()
  readonly descriptionFindings: string;
  @IsString()
  readonly agePatient: string;
}
