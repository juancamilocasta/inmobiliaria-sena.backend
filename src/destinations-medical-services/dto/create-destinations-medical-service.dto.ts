import { IsString } from 'class-validator';

export class CreateDestinationsMedicalServiceDto {
  @IsString()
  readonly idMedicalService: string;
  @IsString()
  readonly destination: string;
}
