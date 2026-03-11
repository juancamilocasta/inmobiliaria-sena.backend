import { MedicalService } from 'src/medical-services/entities/medical-services.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StateMedicalService } from './state-medical-services.entity';
import { TransfersDuringService } from 'src/transfers-during-service/entities/transfers-during-service.entity';

@Entity('stateMedicalServicesChanges')
export class StateMedicalServicesChange {
  @PrimaryGeneratedColumn('increment', {
    name: 'idStateMedicalServicesChanges',
  })
  idStateMedicalServicesChanges: number;

  @Column('uuid', { name: 'idMedicalService' })
  idMedicalService: string;

  @Column('int', { name: 'idStateMedicalService' })
  idStateMedicalService: number;

  @ManyToOne(
    () => MedicalService,
    (medicalServices) => medicalServices.stateChange,
  )
  @JoinColumn({ name: 'idMedicalService' })
  medicalService: MedicalService;

  @ManyToOne(() => StateMedicalService, (state) => state.stateChange)
  @JoinColumn({ name: 'idStateMedicalService' })
  state: StateMedicalService;

  @Column('datetime', {
    name: 'dateTimeChange',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateTimeChange: Date;
  @OneToOne(
    () => TransfersDuringService,
    (transferDuringService) => transferDuringService.stateMedicalServicesChange,
  )
  transfersDuringService: TransfersDuringService;
}
