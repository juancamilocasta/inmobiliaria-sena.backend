import { MedicalRecord } from 'src/medical-record/entities/medical-record.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('physicalExamination')
export class PhysicalExamination {
  @PrimaryGeneratedColumn('uuid', { name: 'idPhysicalExamination' })
  idPhysicalExamination: string;
  @Column('varchar', { name: 'idMedicalRecord' })
  idMedicalRecord: string;
  @Column('varchar', { name: 'hourExam' })
  hourExam: string;
  @Column('varchar', { name: 'heartRate' })
  heartRate: string;
  @Column('varchar', { name: 'glucose' })
  glucose: string;
  @Column('varchar', { name: 'respiratoryRate' })
  respiratoryRate: string;
  @Column('varchar', { name: 'PA' })
  PA: string;
  @Column('varchar', { name: 'temperature' })
  temperature: string;
  @Column('varchar', { name: 'glasgowRO' })
  glasgowRO: string;
  @Column('varchar', { name: 'glasgowRV' })
  glasgowRV: string;
  @Column('varchar', { name: 'glasgowRM' })
  glasgowRM: string;
  @Column('varchar', { name: 'saturation' })
  saturation: string;

  @ManyToOne(
    () => MedicalRecord,
    (medicalRecord) => medicalRecord.physicalExaminations,
  )
  @JoinColumn({ name: 'idMedicalRecord' })
  medicalRecord: MedicalRecord;
}
