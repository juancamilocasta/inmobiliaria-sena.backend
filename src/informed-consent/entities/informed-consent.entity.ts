import { MedicalService } from 'src/medical-services/entities/medical-services.entity';
import { ConcernsPatientInformedConsent } from 'src/concerns-patient-informed-consent/entities/concerns-patient-informed-consent.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProcedureRiskInformedConsent } from 'src/procedure-risks-informed-consent/entities/procedure-risks-informed-consent.entity';

@Entity('informedConsent')
export class InformedConsent {
  @PrimaryGeneratedColumn('increment', { name: 'idInformedConsent' })
  idInformedConsent: number;
  @Column('uuid', { name: 'idMedicalService' })
  idMedicalService: string;
  @Column('varchar', { name: 'idPersonSignatureFile' })
  idPersonSignatureFile: string;
  @Column('tinyint', { name: 'isAcceptedConsent' })
  isAcceptedConsent: boolean;
  @Column('datetime', {
    name: 'registrationDate',
    default: () => 'CURRENT_TIMESTAMP',
  })
  registrationDate: string;

  @OneToMany(
    () => ConcernsPatientInformedConsent,
    (concernPatient) => concernPatient.informedConsent,
  )
  concernsPatientInformedConsent: ConcernsPatientInformedConsent[];

  @OneToOne(
    () => ProcedureRiskInformedConsent,
    (procedureRisk) => procedureRisk.informedConsent,
  )
  procedureRiskInformedConsent: ProcedureRiskInformedConsent;

  @OneToOne(
    () => MedicalService,
    (medicalService) => medicalService.informedConsent,
  )
  @JoinColumn({ name: 'idMedicalService' })
  medicalService: MedicalService;
}
