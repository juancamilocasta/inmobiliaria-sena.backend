import { MedicalRecord } from 'src/medical-record/entities/medical-record.entity';
import { MedicalService } from 'src/medical-services/entities/medical-services.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('diagnosis')
export class Diagnosis {
  @PrimaryGeneratedColumn('increment', { name: 'idDiagnosis' })
  idDiagnosis: number;
  @Column('varchar', { name: 'description', unique: true })
  description: string;
  @Column('tinyint', { name: 'active', default: true })
  active: boolean;

  @OneToMany(
    () => MedicalService,
    (medicalServices) => medicalServices.diagnosis,
  )
  medicalServices: MedicalService[];
  @OneToMany(() => MedicalRecord, (medicalRecords) => medicalRecords.diagnosis)
  medicalRecords: MedicalRecord[];
}
