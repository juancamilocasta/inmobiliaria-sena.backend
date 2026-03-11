import { InformedConsent } from 'src/informed-consent/entities/informed-consent.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('concernsPatientInformedConsent')
export class ConcernsPatientInformedConsent {
  @PrimaryGeneratedColumn('increment', {
    name: 'idConcernsPatientInformedConsent',
  })
  idConcernsPatientInformedConsent: number;

  @Column('varchar', { name: 'valueConcernOption' })
  valueConcernOption: string;

  @Column('varchar', { name: 'text', nullable: true })
  text: string;

  @Column('int', { name: 'idInformedConsent' })
  idInformedConsent: number;

  @Column('date', { name: 'creationDate', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;

  @Column('tinyint', { name: 'active', default: 1 })
  active: number;

  @ManyToOne(
    () => InformedConsent,
    (informedConsent) => informedConsent.concernsPatientInformedConsent,
  )
  @JoinColumn({ name: 'idInformedConsent' })
  informedConsent: InformedConsent;
}
