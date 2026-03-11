import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateChangeStateChangeDto {
  @IsNumber()
  readonly idStateMedicalService: number;
  @IsString()
  readonly idMedicalService: string;
  @IsNumber()
  @IsOptional()
  readonly fromMedicalRecord?: number;
  @IsOptional()
  @IsString()
  readonly mileage?: string;
}
