import { QuestionOptionSurvey } from 'src/satisfaction-survey/entities/question-option-survey.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('satisfactionSurveyQuestions')
export class SatisfactionSurveyQuestion {
  @PrimaryGeneratedColumn('increment', { name: 'idSatisfactionSurveyQuestion' })
  idSatisfactionSurveyQuestion: number;
  @Column('varchar', { name: 'descriptionSatisfactionSurvey' })
  descriptionSatisfactionSurvey: string;
  @Column('boolean', { name: 'active', default: true })
  active: boolean;

  @OneToMany(
    () => QuestionOptionSurvey,
    (questionOption) => questionOption.satisfactionSurveyQuestion,
  )
  questionOptionSurvey: QuestionOptionSurvey[];
}
