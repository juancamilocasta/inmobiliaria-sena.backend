import { IsArray, isNumber, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePropiertyDto {
    @IsOptional()
    @IsNumber()
    readonly price?: number;
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
    readonly descriptionPropierty?: string;
    @IsNumber()
    @IsOptional()
    readonly idPropiertyState?: number;
    @IsNumber()
    @IsOptional()
    readonly numRoom?: number;
    @IsNumber()
    @IsOptional()
    readonly numBathroom?: number;
    @IsNumber()
    @IsOptional()
    readonly garage?: number;
    @IsString()
    @IsOptional()
    readonly squareMeters?: string;
    @IsString()
    @IsOptional()
    readonly neighborhood?: string;
    @IsOptional()
    @IsString()
    readonly googleMapsUrl: string;
    @IsNumber()
    @IsOptional()
    readonly active?: number;
    @IsArray()
    @IsOptional()
    readonly urlImages?: string[];
    @IsOptional()
    @IsNumber()
    readonly available: number;
}
