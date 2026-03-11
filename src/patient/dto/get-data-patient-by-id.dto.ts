import { IsNumber } from 'class-validator';

export class GetDataPatientByIdDto {
  @IsNumber()
  readonly idPatient: number;
}
