import { SatisfactionSurveyOption } from 'src/satisfaction-survey-options/entities/satisfaction-survey-options.entity';
import { SatisfactionSurveyQuestion } from 'src/satisfaction-survey-questions/entities/satisfaction-survey-questions.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SatisfactionSurveyAnswer } from './answer-satisfaction-survey.entity';

@Entity('questionOptionSurvey')
export class QuestionOptionSurvey {
  @PrimaryGeneratedColumn('increment', { name: 'idQuestionOptionSurvey' })
  idQuestionOptionSurvey: number;

  @ManyToOne(
    () => SatisfactionSurveyQuestion,
    (question) => question.questionOptionSurvey,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'idSatisfactionSurveyQuestion' })
  satisfactionSurveyQuestion: SatisfactionSurveyQuestion;

  @ManyToOne(
    () => SatisfactionSurveyOption,
    (option) => option.questionOptionSurvey,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'idSatisfactionSurveyOption' })
  satisfactionSurveyOption: SatisfactionSurveyOption;

  @OneToMany(
    () => SatisfactionSurveyAnswer,
    (answer) => answer.satisfactionSurvey,
  )
  satisfactionSurveyAnswer: SatisfactionSurveyAnswer[];
}
