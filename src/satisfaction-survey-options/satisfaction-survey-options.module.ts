import { Module } from '@nestjs/common';
import { SatisfactionSurveyOptionsService } from './satisfaction-survey-options.service';
import { SatisfactionSurveyOptionsController } from './satisfaction-survey-options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SatisfactionSurveyOption } from './entities/satisfaction-survey-options.entity';

@Module({
  controllers: [SatisfactionSurveyOptionsController],
  providers: [SatisfactionSurveyOptionsService],
  exports: [SatisfactionSurveyOptionsService],
  imports: [TypeOrmModule.forFeature([SatisfactionSurveyOption])],
})
export class SatisfactionSurveyOptionsModule {}
