import { IsOptional } from 'class-validator';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateVehicleDto {
  @IsNumber()
  readonly idVehicleType: number;

  @IsString({ message: 'La placa es requerida' })
  readonly plaque: string;

  @IsDate({ message: 'La vigencia soat es requerida' })
  readonly dateSoatVigency: Date;

  @IsDate({ message: 'La vigencia tecnicomecanica es requerida' })
  readonly dateTecnicomecanicVigency: Date;

  @IsOptional()
  @IsNumber()
  readonly active: number;
}
