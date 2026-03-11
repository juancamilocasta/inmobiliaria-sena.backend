import { MedicalService } from 'src/medical-services/entities/medical-services.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('destinationsMedicalServices')
export class DestinationsMedicalService {
  @PrimaryGeneratedColumn('increment', { name: 'idDestinationMedicalService' })
  idDestinationMedicalService: number;
  @Column('uuid', { name: 'idMedicalService' })
  idMedicalService: string;
  @Column('varchar', { name: 'destination', length: 100 })
  destination: string;
  @Column('datetime', {
    name: 'dateCreated',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateCreated: string;

  @ManyToOne(
    () => MedicalService,
    (medicalService) => medicalService.destinationsMedicalServices,
  )
  @JoinColumn({ name: 'idMedicalService' })
  medicalService: MedicalService;
}
