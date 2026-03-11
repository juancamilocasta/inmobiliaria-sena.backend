import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SatisfactionSurvey } from './entities/satisfaction-survey.entity';
import { Repository } from 'typeorm';
import { CreateSatisfactionSurveyDto } from './dto/create-satisfaction-survey.dto';
import { SatisfactionSurveyAnswer } from './entities/answer-satisfaction-survey.entity';
import { QuestionOptionSurvey } from './entities/question-option-survey.entity';
import { CreateAnswerSatisfactionSurveyDto } from './dto/create-answer-satisfaction-survey.dto';

@Injectable()
export class SatisfactionSurveyService {
  private readonly logger = new Logger('SatisfactionSurveyService');
  constructor(
    @InjectRepository(SatisfactionSurvey)
    private readonly satisfactionSurveyRepository: Repository<SatisfactionSurvey>,
    @InjectRepository(SatisfactionSurveyAnswer)
    private readonly satisfactionSurveyAnswerRepository: Repository<SatisfactionSurveyAnswer>,
    @InjectRepository(QuestionOptionSurvey)
    private readonly questionOptionSurveyRepository: Repository<QuestionOptionSurvey>,
  ) {}

  async createSatisfactionSurvey(
    createSatisfactionSurveyDto: CreateSatisfactionSurveyDto,
  ) {
    try {
      const {
        idMedicalService,
        respondentDocument,
        respondentFirm,
        observation,
        satisfactionSurveyAnswers,
      } = createSatisfactionSurveyDto;
      const satisfactionSurvey = this.satisfactionSurveyRepository.create({
        idMedicalService,
        respondentDocument,
        respondentFirm,
        observation,
      });
      const savedSatisfactionSurvey =
        await this.satisfactionSurveyRepository.save(satisfactionSurvey);
      const saveAnswerSurvey = await this.insertSurveyAnswers({
        satisfactionSurvey: savedSatisfactionSurvey,
        satisfactionSurveyAnswers,
      });
      if (!saveAnswerSurvey) {
        throw new HttpException(
          'Error al guardar las respuestas de la encuesta',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return savedSatisfactionSurvey;
    } catch (error) {
      this.logger.error(error);

      if (error.errno === 1062) {
        throw new HttpException(
          'La encuesta ya fue enviada',
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getQuestionOptionSurvey() {
    try {
      const questionOptionSurveyRepository =
        await this.questionOptionSurveyRepository.find({
          relations: {
            satisfactionSurveyQuestion: true,
            satisfactionSurveyOption: true,
          },
        });
      if (questionOptionSurveyRepository.length === 0) {
        throw new HttpException('No existen preguntas', HttpStatus.NOT_FOUND);
      }
      const groupedByQuestion = questionOptionSurveyRepository.reduce(
        (accumulate, item) => {
          const questionId =
            item.satisfactionSurveyQuestion.idSatisfactionSurveyQuestion;
          const questionDescription =
            item.satisfactionSurveyQuestion.descriptionSatisfactionSurvey.trim();

          if (!accumulate[questionId]) {
            accumulate[questionId] = {
              description: questionDescription,
              options: [],
            };
          }

          accumulate[questionId].options.push({
            idQuestionOptionSurvey: item.idQuestionOptionSurvey,
            idSatisfactionSurveyOption:
              item.satisfactionSurveyOption.idSatisfactionSurveyOption,
            description:
              item.satisfactionSurveyOption.descriptionSatisfactionSurveyOption.trim(),
            active: item.satisfactionSurveyOption.active,
          });
          return accumulate;
        },
        {},
      );
      const groupedByQuestionArray = Object.values(groupedByQuestion);
      return {
        questionOptionSurvey: groupedByQuestionArray,
        statusCode: 200,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async insertSurveyAnswers(
    createAnswerSatisfactionSurveyDto: CreateAnswerSatisfactionSurveyDto,
  ) {
    const { satisfactionSurveyAnswers, satisfactionSurvey } =
      createAnswerSatisfactionSurveyDto;

    if (!satisfactionSurvey || !satisfactionSurvey.idSatisfactionSurvey) {
      throw new Error('La encuesta no es valida');
    }

    const surveyAnswers: SatisfactionSurveyAnswer[] = [];

    for (const answerId of satisfactionSurveyAnswers) {
      const questionOptionSurvey =
        await this.questionOptionSurveyRepository.findOne({
          where: { idQuestionOptionSurvey: answerId },
        });

      const surveyAnswer = new SatisfactionSurveyAnswer();
      surveyAnswer.idSatisfactionSurvey =
        satisfactionSurvey.idSatisfactionSurvey;
      surveyAnswer.idQuestionOptionSurvey =
        questionOptionSurvey.idQuestionOptionSurvey;
      surveyAnswer.satisfactionSurvey = satisfactionSurvey;
      surveyAnswer.questionOptionSurvey = questionOptionSurvey;

      surveyAnswers.push(surveyAnswer);
    }

    return this.satisfactionSurveyAnswerRepository.save(surveyAnswers);
  }
}
