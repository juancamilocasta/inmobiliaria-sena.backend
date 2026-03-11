import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMedicalServicesDto {
  @IsString({ message: 'El campo ubicación en es requerido' })
  readonly collect: string;
  @IsString({ message: 'El destino es requerido' })
  readonly destination: string;
  @IsNumber()
  readonly idEps: number;
  @IsNumber()
  readonly idDiagnosis: number;
  @IsNumber()
  readonly idServiceType: number;
  @IsNumber()
  readonly idContractingClient: number;
  @IsNumber()
  readonly idPatient: number;
  @IsOptional()
  @IsNumber()
  readonly idMunicipality: number;
  @IsDate()
  readonly dateProgrammed: Date;
  @IsOptional()
  @IsNumber()
  readonly idPopulationZone: number;
  @IsArray()
  readonly supports: string[];
  @IsString()
  readonly clientContact: string;
  @IsOptional()
  @IsString()
  readonly clientContactPhone: string;
  @IsOptional()
  @IsString()
  readonly insurance: string;
  @IsOptional()
  @IsString()
  readonly clinicalRecord: string;
  @IsNumber()
  readonly idVinculationType: number;
  @IsOptional()
  @IsNumber()
  readonly idStateMedicalService: number;
  @IsOptional()
  @IsNumber()
  readonly ventilated: number = 0;
  @IsOptional()
  @IsString()
  readonly ventilatedType: string;
  @IsOptional()
  @IsNumber()
  readonly isolated: number = 0;
  @IsOptional()
  @IsArray()
  readonly insulationTypes: string[] = [];
  @IsOptional()
  @IsNumber()
  readonly fromMedicalRecord?: number;
  @IsOptional()
  @IsString()
  readonly mileage?: string;
}
