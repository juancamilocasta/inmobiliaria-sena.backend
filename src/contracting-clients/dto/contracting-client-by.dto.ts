import { IsString } from 'class-validator';

export class CreateContractingClientDto {
  @IsString({ message: 'El tipo de solicitud es requerido' })
  readonly description: string;
}
