import { Controller } from '@nestjs/common';
import { SatisfactionSurveyOptionsService } from './satisfaction-survey-options.service';

@Controller('satisfaction-survey-options')
export class SatisfactionSurveyOptionsController {
  constructor(
    private readonly satisfactionSurveyOptionsService: SatisfactionSurveyOptionsService,
  ) {}
}
