import { Module } from '@nestjs/common';
import { SatisfactionSurveyQuestionsService } from './satisfaction-survey-questions.service';
import { SatisfactionSurveyQuestionsController } from './satisfaction-survey-questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SatisfactionSurveyQuestion } from './entities/satisfaction-survey-questions.entity';

@Module({
  controllers: [SatisfactionSurveyQuestionsController],
  providers: [SatisfactionSurveyQuestionsService],
  exports: [SatisfactionSurveyQuestionsService],
  imports: [TypeOrmModule.forFeature([SatisfactionSurveyQuestion])],
})
export class SatisfactionSurveyQuestionsModule {}
