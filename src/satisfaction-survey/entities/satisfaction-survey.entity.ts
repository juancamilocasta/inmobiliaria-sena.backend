import { MedicalService } from 'src/medical-services/entities/medical-services.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SatisfactionSurveyAnswer } from './answer-satisfaction-survey.entity';

@Entity('satisfactionSurveys')
export class SatisfactionSurvey {
  @PrimaryGeneratedColumn('uuid', { name: 'idSatisfactionSurvey' })
  idSatisfactionSurvey: string;
  @Column('uuid', { name: 'idMedicalService', unique: true })
  idMedicalService: string;
  @Column('varchar', { name: 'respondentFirm' })
  respondentFirm: string;
  @Column('varchar', { name: 'respondentDocument' })
  respondentDocument: string;
  @Column('date', { name: 'date', default: () => 'NOW()' })
  date: Date;
  @Column('varchar', {
    name: 'observation',
    nullable: true,
    default: null,
    length: 255,
  })
  observation: string;

  @OneToOne(() => MedicalService, (service) => service.satisfactionSurvey)
  @JoinColumn({ name: 'idMedicalService' })
  medicalService: MedicalService;

  @OneToMany(
    () => SatisfactionSurveyAnswer,
    (answer) => answer.satisfactionSurvey,
  )
  satisfactionSurveyAnswer: SatisfactionSurveyAnswer[];
}
