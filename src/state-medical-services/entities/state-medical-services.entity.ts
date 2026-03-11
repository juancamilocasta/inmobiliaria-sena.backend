import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StateMedicalServicesChange } from './medical-services-state-change.entity';
import { MedicalService } from 'src/medical-services/entities/medical-services.entity';

@Entity('stateMedicalServices')
export class StateMedicalService {
  @PrimaryGeneratedColumn('increment', {
    name: 'idStateMedicalService',
  })
  idStateMedicalService: number;

  @Column('varchar', { name: 'description', unique: true, length: 100 })
  description: string;

  @Column('varchar', { name: 'color', unique: true, length: 100 })
  color: string;

  @Column('tinyint', { name: 'isActive', default: 1 })
  isActive: number;

  @Column('tinyint', { name: 'readOnlyState', default: 0 })
  readOnlyState: number;
  @Column('varchar', { name: 'warningMessageHeader', nullable: true })
  warningMessageHeader: string;
  @Column('varchar', { name: 'warningMessageContent', nullable: true })
  warningMessageContent: string;
  @OneToMany(
    () => StateMedicalServicesChange,
    (stateMedicalServicesChanges) => stateMedicalServicesChanges.state,
  )
  stateChange: StateMedicalServicesChange[];

  @OneToMany(
    () => MedicalService,
    (medicalService) => medicalService.currentState,
  )
  medicalServices: MedicalService[];
}
