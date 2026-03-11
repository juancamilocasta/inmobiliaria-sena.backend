import { MedicalService } from 'src/medical-services/entities/medical-services.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('checklistTabTam')
export class ChecklistTabTam {
  @PrimaryGeneratedColumn('uuid', { name: 'idCheckListTabTam' })
  idCheckListTabTam: string;
  @Column('uuid', { name: 'idMedicalService', unique: true })
  idMedicalService: string;
  @Column('varchar', { name: 'referenceDocument' })
  referenceDocument: string;
  @Column('varchar', { name: 'medicalRecord' })
  medicalRecord: string;
  @Column('varchar', { name: 'informedConsent' })
  informedConsent: string;
  @Column('varchar', { name: 'diagnosticAidsDelivered' })
  diagnosticAidsDelivered: string;
  @Column('varchar', {
    name: 'detailDiagnosticAids',
    nullable: true,
    length: 255,
  })
  detailDiagnosticAids: string;
  @Column('varchar', { name: 'copyOfDocument' })
  copyOfDocument: string;
  @Column('varchar', { name: 'epicrisisDelivery' })
  epicrisisDelivery: string;
  @Column('varchar', { name: 'otherDocuments' })
  otherDocuments: string;
  @Column('varchar', {
    name: 'detailOtherDocuments',
    nullable: true,
    length: 255,
  })
  detailOtherDocuments: string;
  @Column('datetime', { name: 'dateCreated', default: () => 'NOW()' })
  dateCreated: Date;

  @OneToOne(() => MedicalService, (service) => service.satisfactionSurvey)
  @JoinColumn({ name: 'idMedicalService' })
  medicalService: MedicalService;
}
