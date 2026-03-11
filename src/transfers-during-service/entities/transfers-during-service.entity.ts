import { StateMedicalServicesChange } from 'src/state-medical-services/entities/medical-services-state-change.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('TransfersDuringService')
export class TransfersDuringService {
  @PrimaryGeneratedColumn('increment', { name: 'idTransferDuringService' })
  idTransferDuringService: number;
  @Column('int', { name: 'idStateMedicalServiceChanges', unique: true })
  idStateMedicalServiceChanges: number;
  @Column('varchar', { name: 'mileage' })
  mileage: string;
  @Column('datetime', { name: 'dateCreated' })
  dateCreated: string;

  @OneToOne(
    () => StateMedicalServicesChange,
    (state) => state.transfersDuringService,
  )
  @JoinColumn({ name: 'idStateMedicalServiceChanges' })
  stateMedicalServicesChange: StateMedicalServicesChange;
}
