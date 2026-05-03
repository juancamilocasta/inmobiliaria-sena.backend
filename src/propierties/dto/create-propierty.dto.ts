import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePropiertyDto {
    @IsNumber()
    readonly price: number;
    @IsNumber()
    readonly idUbication: number;
    @IsNumber()
    readonly idPropiertyType: number;
    @IsString()
    readonly typeOperation: string;
    @IsString()
    readonly descriptionPropierty: string;
    @IsNumber()
    @IsOptional()
    readonly idPropiertyState?: number;
    @IsArray()
    readonly urlImages: string[];
    @IsNumber()
    readonly numRoom: number;
    @IsNumber()
    readonly numBathroom: number;
    @IsNumber()
    @IsOptional()
    readonly garage?: number;
    @IsString()
    readonly squareMeters: string;
    @IsString()
    readonly neighborhood: string;
    @IsString()
    readonly googleMapsUrl: string;
}
