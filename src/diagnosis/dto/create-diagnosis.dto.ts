import { IsString } from 'class-validator';

export class CreateDiagnosisDto {
  @IsString({ message: 'El diagnostico es requerido' })
  readonly description: string;
}
