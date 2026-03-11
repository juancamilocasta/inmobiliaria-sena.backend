import { IsBoolean } from 'class-validator';

export class UpdateInformedConsentDto {
  @IsBoolean()
  readonly isAcceptedConsent: boolean;
}
