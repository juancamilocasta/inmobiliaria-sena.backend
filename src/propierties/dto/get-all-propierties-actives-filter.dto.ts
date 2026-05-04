import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetAllPropiertiesActivesFilterDto {
    @IsNumber()
    @IsOptional()
    readonly priceStart?: number;
    @IsNumber()
    @IsOptional()
    readonly priceEnd?: number;
    @IsNumber()
    @IsOptional()
    readonly idUbication?: number;
    @IsNumber()
    @IsOptional()
    readonly idPropiertyType?: number;
    @IsString()
    @IsOptional()
    readonly typeOperation?: string;
    @IsString()
    @IsOptional()
    readonly propiertyCode?: string;
    @IsNumber()
    readonly page: number;
    @IsNumber()
    readonly limit: number;
    @IsNumber()
    @IsOptional()
    readonly available?: number;
}