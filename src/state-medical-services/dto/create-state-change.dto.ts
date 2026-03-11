import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateStateMedicalServicesDto {
  @IsString()
  @MaxLength(100, {
    message: 'Estado debe ser menor o igual a 100 caracteres',
  })
  @MinLength(1, { message: 'Estado es requerido' })
  readonly description: string;

  @IsString()
  @MaxLength(100, {
    message: 'Color debe ser menor o igual a 100 caracteres',
  })
  @MinLength(1, { message: 'Color es requerido' })
  readonly color: string;
}
