import { IsDate, IsNumber, IsString, MinLength } from 'class-validator';

export class CreatePatientDto {
  @IsString({ message: 'El documento es requerido' })
  @MinLength(5, { message: 'El documento debe ser mayor de 5 caracteres' })
  readonly document: string;
  @IsDate({ message: 'Fecha de nacimiento es requerida' })
  readonly birthdate: Date;
  @IsNumber()
  readonly weight: number;
  @IsString({ message: 'El nombre es requerido' })
  @MinLength(2, { message: 'El nombre debe ser mayor de 2 caracteres' })
  readonly name: string;
  @IsString({ message: 'El apellido es requerido' })
  @MinLength(2, { message: 'El apellido debe ser mayor de 2 caracteres' })
  readonly surName: string;
  @IsNumber()
  readonly idDocumentType: number;
  @IsNumber()
  readonly idGender: number;
}
