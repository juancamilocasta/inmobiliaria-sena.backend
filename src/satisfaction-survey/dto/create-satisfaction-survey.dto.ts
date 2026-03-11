import { IsArray, IsString } from 'class-validator';

export class CreateSatisfactionSurveyDto {
  @IsString()
  idMedicalService: string;
  @IsString()
  respondentFirm: string;
  @IsString()
  respondentDocument: string;
  @IsArray()
  satisfactionSurveyAnswers: number[];
  @IsString()
  observation: string;
}
