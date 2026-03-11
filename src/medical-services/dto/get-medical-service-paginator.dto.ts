import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetMedicalServicePaginatorDto {
  @IsNumber()
  readonly page: number;
  @IsNumber()
  readonly limit: number;
  @IsString()
  @IsOptional()
  readonly wordsFilter?: string;
}
