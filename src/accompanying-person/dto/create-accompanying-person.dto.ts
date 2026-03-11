import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAccompanyingPersonDto {
  @IsNumber()
  readonly idDocumentType: number;
  @IsString()
  @MinLength(10, { message: 'El documento debe ser igual a 10 caracteres' })
  @MaxLength(10, { message: 'El documento debe ser igual a 10 caracteres' })
  readonly document: string;
  @IsString()
  @MinLength(4, { message: 'El nombre debe ser mayor de 4 caracteres' })
  @MaxLength(60, { message: 'El nombre debe ser menor de 60 caracteres' })
  readonly fullName: string;
  @IsString()
  @MinLength(8, {
    message: 'El teléfono debe ser igual o mayor a 8 caracteres',
  })
  @MaxLength(10, {
    message: 'El teléfono debe de ser igual o menor a 10 caracteres',
  })
  readonly phone: string;
  @IsNumber()
  readonly idRelationship: number;
  @IsString()
  readonly idMedicalService: string;
}
