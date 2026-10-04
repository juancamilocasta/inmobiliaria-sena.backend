import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetAllPropiertyAdminDto {
    @IsNumber()
    readonly page: number;

    @IsNumber()
    readonly limit: number;

    @IsString()
    @IsOptional()
    readonly dateStart?: string;

    @IsString()
    @IsOptional()
    readonly dateEnd?: string;

    @IsNumber()
    @IsOptional()
    readonly idUbication?: number;

    @IsNumber()
    @IsOptional()
    readonly idPropiertyType?: number;

    @IsNumber()
    @IsOptional()
    readonly idPropiertyState?: number;

    @IsString()
    @IsOptional()
    readonly typeOperation?: string;

    @IsString()
    @IsOptional()
    readonly propiertyCode?: string;

    @IsNumber()
    @IsOptional()
    readonly active?: number;

    @IsNumber()
    @IsOptional()
    readonly available?: number;

    @IsNumber()
    @IsOptional()
    readonly priceStart?: number;

    @IsNumber()
    @IsOptional()
    readonly priceEnd?: number;

    @IsString()
    @IsOptional()
    readonly wordsFilter?: string;
}
