import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @IsDate()
  readonly eventDate: Date;
  @IsDate()
  readonly eventDateEnd: Date;
  @IsString()
  readonly eventName: string;
  @IsString()
  readonly eventPlace: string;
  @IsOptional()
  @IsNumber()
  readonly idMunicipality: number;
  @IsString()
  readonly eventType: string;
  @IsOptional()
  readonly capacity: string;
  @IsNumber()
  readonly idContractingClient: number;
  @IsString()
  readonly personResponsible: string;
  @IsOptional()
  @IsString()
  readonly personResponsiblePhone: string;
  @IsOptional()
  @IsString()
  readonly ambulanceAccompaniment: string;
  @IsOptional()
  @IsNumber()
  readonly idStateEvent: number;
}
