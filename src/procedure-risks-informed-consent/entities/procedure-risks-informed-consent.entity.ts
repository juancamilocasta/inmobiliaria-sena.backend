import { InformedConsent } from 'src/informed-consent/entities/informed-consent.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('procedureRisksInformedConsent')
export class ProcedureRiskInformedConsent {
  @PrimaryGeneratedColumn('increment', {
    name: 'idProcedureRiskInformedConsent',
  })
  idProcedureRiskInformedConsent: number;

  @Column('varchar', { name: 'valueProcedureRiskOption' })
  valueProcedureRiskOption: string;

  @Column('varchar', { name: 'text', nullable: true })
  text: string;

  @Column('int', { name: 'idInformedConsent' })
  idInformedConsent: number;

  @Column('date', { name: 'creationDate', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;

  @Column('tinyint', { name: 'active', default: 1 })
  active: number;

  @OneToOne(
    () => InformedConsent,
    (informedConsent) => informedConsent.procedureRiskInformedConsent,
  )
  @JoinColumn({ name: 'idInformedConsent' })
  informedConsent: InformedConsent;
}
