import { IsNumber } from 'class-validator';

export class GetDepartmentByIdDto {
  @IsNumber()
  readonly idDepartment: number;
}
