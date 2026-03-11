import { IsString } from 'class-validator';

export class CreateChecklistTabTamDto {
  @IsString()
  readonly idMedicalService: string;
  @IsString()
  readonly referenceDocument: string;
  @IsString()
  readonly medicalRecord: string;
  @IsString()
  readonly informedConsent: string;
  @IsString()
  readonly diagnosticAidsDelivered: string;
  @IsString()
  readonly detailDiagnosticAids: string;
  @IsString()
  readonly copyOfDocument: string;
  @IsString()
  readonly epicrisisDelivery: string;
  @IsString()
  readonly otherDocuments: string;
  @IsString()
  readonly detailOtherDocuments: string;
}
