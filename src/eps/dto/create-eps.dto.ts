import { IsString } from 'class-validator';

export class CreateEpsDto {
  @IsString({ message: 'La EPS es requerida' })
  readonly description: string;
}
