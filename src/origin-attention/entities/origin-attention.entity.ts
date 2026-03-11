import { MedicalRecord } from 'src/medical-record/entities/medical-record.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('originAttention')
export class OriginAttention {
  @PrimaryGeneratedColumn('increment', { name: 'idOriginAttention' })
  idOriginAttention: number;
  @Column('varchar', { name: 'descriptionOriginAttention' })
  descriptionOriginAttention: string;
  @Column('tinyint', { name: 'active' })
  active: number;
  @OneToMany(
    () => MedicalRecord,
    (medicalRecord) => medicalRecord.orignAttention,
  )
  medicalRecords: MedicalRecord[];
}
