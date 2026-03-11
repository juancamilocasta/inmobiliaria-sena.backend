import { Body, Controller, Get, Post } from '@nestjs/common';
import { SatisfactionSurveyService } from './satisfaction-survey.service';
import { CreateSatisfactionSurveyDto } from './dto/create-satisfaction-survey.dto';

@Controller('satisfaction-survey')
export class SatisfactionSurveyController {
  constructor(
    private readonly satisfactionSurveyService: SatisfactionSurveyService,
  ) {}

  @Post()
  createSatisfactionSurvey(
    @Body() createSatisfactionSurveyDto: CreateSatisfactionSurveyDto,
  ) {
    return this.satisfactionSurveyService.createSatisfactionSurvey(
      createSatisfactionSurveyDto,
    );
  }
  @Get('question-option-survey-group-by-question')
  getQuestionOptionSurvey() {
    return this.satisfactionSurveyService.getQuestionOptionSurvey();
  }
}
