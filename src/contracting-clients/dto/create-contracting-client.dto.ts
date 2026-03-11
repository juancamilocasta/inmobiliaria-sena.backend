import { IsNumber, IsString } from 'class-validator';

export class CreateContractingClientDto {
  @IsNumber()
  readonly idClientType: number;
  @IsString()
  readonly description: string;
  @IsNumber()
  readonly idPersonType: number;
  @IsNumber()
  readonly idDocumentType: number;
  @IsString()
  readonly documentNumber: string;
  @IsNumber()
  readonly idTaxDetail: number;
  @IsNumber()
  readonly idTaxResponsibility: number;
  @IsString()
  readonly email: string;
  @IsNumber()
  readonly countryCode: number;
  @IsNumber()
  readonly idMunicipality: number;
  @IsNumber()
  readonly idPostalCode: number;
}
