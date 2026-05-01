import { IsOptional, IsString } from 'class-validator';

export class EditSameUserDto {
  @IsOptional()
  @IsString()
  readonly userName: string;
  @IsOptional()
  @IsString()
  readonly lastName: string;
  @IsOptional()
  @IsString()
  readonly password?: string;
}
