import { IsString } from "class-validator";

export class CreatePropiertyStateDto {
    @IsString()
    readonly descriptionState: string;
}
