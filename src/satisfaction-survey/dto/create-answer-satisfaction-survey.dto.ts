import { IsArray, IsObject } from 'class-validator';
import { SatisfactionSurvey } from '../entities/satisfaction-survey.entity';

export class CreateAnswerSatisfactionSurveyDto {
  @IsObject()
  satisfactionSurvey: SatisfactionSurvey;
  @IsArray()
  satisfactionSurveyAnswers: number[];
}
