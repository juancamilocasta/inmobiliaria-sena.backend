import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateEventSignatureDto {
  @IsUUID()
  readonly idEvent: string;
  @IsUUID()
  readonly signingUserId: string;
  @IsString()
  readonly password: string;
  @IsOptional()
  readonly active: number = 1;
}
