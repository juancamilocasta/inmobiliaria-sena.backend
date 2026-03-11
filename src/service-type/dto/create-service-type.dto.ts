import { IsString } from 'class-validator';

export class CreateServiceTypeDto {
  @IsString({ message: 'El tipo de servicio es requerido' })
  readonly description: string;
}
