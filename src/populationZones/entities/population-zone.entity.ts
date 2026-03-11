import { MedicalRecord } from 'src/medical-record/entities/medical-record.entity';
import { MedicalService } from 'src/medical-services/entities/medical-services.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('populationZones')
export class PopulationZone {
  @PrimaryGeneratedColumn('increment', { name: 'idPopulationZone' })
  idPopulationZone: number;
  @Column('varchar', { name: 'description', unique: true })
  description: string;
  @Column('tinyint', { name: 'active', default: 1 })
  active: number;
  @Column('char', { name: 'codeMin', length: 2 })
  codeMin: string;

  @OneToMany(
    () => MedicalService,
    (medicalService) => medicalService.populationZone,
  )
  medicalServices: MedicalService[];

  @OneToMany(
    () => MedicalRecord,
    (medicalRecord) => medicalRecord.populationZoneResidencePatient,
  )
  medicalRecordsResidence: MedicalRecord[];
}
