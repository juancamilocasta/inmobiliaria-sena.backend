import { Controller } from '@nestjs/common';
import { SatisfactionSurveyQuestionsService } from './satisfaction-survey-questions.service';

@Controller('satisfaction-survey-questions')
export class SatisfactionSurveyQuestionsController {
  constructor(
    private readonly satisfactionSurveyQuestionsService: SatisfactionSurveyQuestionsService,
  ) {}
}
