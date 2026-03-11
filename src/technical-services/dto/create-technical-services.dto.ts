import { IsString, MinLength } from 'class-validator';

export class CreateTechnicalServicesDto {
  @IsString({ message: 'El asunto es requerido' })
  @MinLength(2, { message: 'El asunto debe ser mayor de 2 caracteres' })
  readonly case: string;
  @IsString({ message: 'El mensaje es requerido' })
  @MinLength(2, { message: 'El mensaje debe ser mayor de 2 caracteres' })
  readonly message: string;
}
