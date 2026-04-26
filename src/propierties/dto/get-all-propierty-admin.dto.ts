import { IsString } from "class-validator";

export class GetAllPropiertyAdminDto {
    @IsString()
    readonly dateStart: string;
    @IsString()
    readonly dateEnd: string;
}