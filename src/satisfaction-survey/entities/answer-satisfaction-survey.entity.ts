import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SatisfactionSurvey } from './satisfaction-survey.entity';
import { QuestionOptionSurvey } from './question-option-survey.entity';

@Entity('satisfactionSurveyAnswers')
export class SatisfactionSurveyAnswer {
  @PrimaryGeneratedColumn('increment', { name: 'idSatisfactionSurveyAnswer' })
  idSatisfactionSurveyAnswer: number;

  @Column('uuid', { name: 'idSatisfactionSurvey' })
  idSatisfactionSurvey: string;

  @Column('int', { name: 'idQuestionOptionSurvey' })
  idQuestionOptionSurvey: number;

  @ManyToOne(
    () => SatisfactionSurvey,
    (survey) => survey.satisfactionSurveyAnswer,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'idSatisfactionSurvey' })
  satisfactionSurvey: SatisfactionSurvey;

  @ManyToOne(
    () => QuestionOptionSurvey,
    (survey) => survey.satisfactionSurveyAnswer,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'idQuestionOptionSurvey' })
  questionOptionSurvey: QuestionOptionSurvey;
}
