import { QuestionOptionSurvey } from 'src/satisfaction-survey/entities/question-option-survey.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('satisfactionSurveyOptions')
export class SatisfactionSurveyOption {
  @PrimaryGeneratedColumn('increment', { name: 'idSatisfactionSurveyOption' })
  idSatisfactionSurveyOption: string;
  @Column('varchar', { name: 'descriptionSatisfactionSurveyOption' })
  descriptionSatisfactionSurveyOption: string;
  @Column('boolean', { name: 'active', default: true })
  active: boolean;

  @OneToMany(
    () => QuestionOptionSurvey,
    (questionOption) => questionOption.satisfactionSurveyOption,
  )
  questionOptionSurvey: QuestionOptionSurvey[];
}
