import { IsBoolean, IsString } from 'class-validator';

export class CreateInformedConsentDto {
  @IsString()
  readonly idMedicalService: string;
  @IsString()
  readonly idPersonSignatureFile: string;
  @IsBoolean()
  readonly isAcceptedConsent: boolean;
}
