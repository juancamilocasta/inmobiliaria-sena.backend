import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class ConcernDto {
  @IsString()
  @IsOptional()
  readonly text: string;
  @IsNumber()
  @IsOptional()
  readonly id: number;
}

export class CreateConcernPatientInformedConsentDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConcernDto)
  @IsOptional()
  readonly concerns: ConcernDto[];
  @IsNumber()
  readonly idInformedConsent: number;
  @IsString()
  readonly valueConcernOption: string;
}
