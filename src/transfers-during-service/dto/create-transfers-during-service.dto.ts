import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTransfersDuringServiceDto {
  @IsString()
  @IsOptional()
  readonly mileage: string;
  @IsNumber()
  readonly idStateMedicalService: number;
}
