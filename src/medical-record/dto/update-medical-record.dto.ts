import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
export enum SedatedPatient {
  SI,
  NO,
}
export class UpdateMedicalRecordDto {
  @IsString()
  @IsOptional()
  readonly agePatient?: string;
  @IsString()
  @IsOptional()
  readonly occupationPatient?: string;
  @IsNumber()
  @IsOptional()
  readonly idMaritalStatusPatient?: number;
  @IsString()
  @IsOptional()
  readonly phonePatient?: string;
  @IsNumber()
  @IsOptional()
  readonly idMunicipalityResidencePatient?: number;
  @IsNumber()
  @IsOptional()
  readonly idPopulationZoneResidencePatient?: number;
  @IsString()
  @IsOptional()
  readonly usualAddressPatient?: string;
  @IsNumber()
  @IsOptional()
  readonly idOrignAttention?: number;
  @IsString()
  @IsOptional()
  readonly otherOrignAttention?: string;
  @IsString()
  @IsOptional()
  readonly allergicsHistory?: string;
  @IsString()
  @IsOptional()
  readonly medicationsHistory?: string;
  @IsString()
  @IsOptional()
  readonly surgicalHistory?: string;
  @IsString()
  @IsOptional()
  readonly pathologicalHistory?: string;
  @IsString()
  @IsOptional()
  readonly proceduresCarriedTransfer?: string;
  @IsString()
  @IsOptional()
  readonly statePatientReceived?: string;
  @IsString()
  @IsOptional()
  readonly statePatientDelivered?: string;
  @IsNumber()
  @IsOptional()
  readonly idDiagnosis?: number;
  @IsString()
  @IsOptional()
  readonly medicalOrders?: string;
  @IsNumber()
  @IsOptional()
  readonly numberWaitingHours?: number;
  @IsString()
  @IsOptional()
  readonly reasonHoursWaiting?: string;
  @IsString()
  @IsOptional()
  readonly inCaseRejectPatientDocument: string;
  @IsString()
  @IsOptional()
  readonly inCaseRejectWitnessDocument: string;
  @IsEnum(SedatedPatient, {
    message: 'El dato sobre sedado del paciente debe ser Si o No',
  })
  @IsOptional()
  readonly sedatedPatient: string;
  @IsString()
  @IsOptional()
  readonly responseSedatedPatient: string;
}
