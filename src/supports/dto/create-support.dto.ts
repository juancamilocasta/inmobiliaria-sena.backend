import { IsString } from 'class-validator';

export class CreateSupportDto {
  @IsString({ message: 'El campo soporte es requerido' })
  readonly description: string;
}
