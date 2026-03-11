import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProcedureRisksInformedConsentDto {
  @IsString()
  readonly valueProcedureRiskOption: string;
  @IsString()
  @IsOptional()
  readonly text?: string;
  @IsNumber()
  readonly idInformedConsent: number;
}
