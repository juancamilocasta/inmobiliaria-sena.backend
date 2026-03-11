import { MedicalRecord } from 'src/medical-record/entities/medical-record.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('maritalStatus')
export class MaritalStatus {
  @PrimaryGeneratedColumn('increment', { name: 'idMaritalStatus' })
  idMaritalStatus: number;
  @Column('varchar', { name: 'descriptionMaritalStatus' })
  descriptionMaritalStatus: string;
  @Column('tinyint', { name: 'active' })
  activeMaritalStatus: number;

  @OneToMany(
    () => MedicalRecord,
    (medicalRecord) => medicalRecord.maritalStatus,
  )
  medicalRecords: MedicalRecord[];
}
