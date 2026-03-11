import { Module } from '@nestjs/common';
import { SatisfactionSurveyService } from './satisfaction-survey.service';
import { SatisfactionSurveyController } from './satisfaction-survey.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SatisfactionSurvey } from './entities/satisfaction-survey.entity';
import { QuestionOptionSurvey } from './entities/question-option-survey.entity';
import { SatisfactionSurveyAnswer } from './entities/answer-satisfaction-survey.entity';

@Module({
  controllers: [SatisfactionSurveyController],
  providers: [SatisfactionSurveyService],
  exports: [SatisfactionSurveyService],
  imports: [
    TypeOrmModule.forFeature([
      SatisfactionSurvey,
      QuestionOptionSurvey,
      SatisfactionSurveyAnswer,
    ]),
  ],
})
export class SatisfactionSurveyModule {}
