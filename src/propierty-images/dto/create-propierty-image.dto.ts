import { IsArray, IsNumber, IsString } from "class-validator";

export class CreatePropiertyImageDto {
    @IsNumber()
    readonly idPropierty: number;
    @IsArray()
    readonly urlImages: string[];
}
