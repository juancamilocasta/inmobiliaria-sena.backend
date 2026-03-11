import { ContractingClient } from 'src/contracting-clients/entities/contracting-client.entity';
import { EventAssignment } from 'src/event-assignments/entities/event-assignment.entity';
import { EventSignature } from 'src/event-signatures/entities/event-signature.entity';
import { EventFile } from 'src/files/entities/event-files.entity';
import { Municipality } from 'src/municipality/entities/municipality.entity';
import { PatientEventRegister } from 'src/patient-event-register/entities/patient-event-register.entity';
import { StateEventChange } from 'src/state-event/entities/state-event-change.entity';
import { StateEvent } from 'src/state-event/entities/state-event.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid', { name: 'idEvent' })
  idEvent: string;
  @Column('datetime', { name: 'eventDate' })
  eventDate: Date;
  @Column('datetime', { name: 'eventDateEnd' })
  eventDateEnd: Date;
  @Column('varchar', { name: 'eventName' })
  eventName: string;
  @Column('varchar', { name: 'eventPlace' })
  eventPlace: string;
  @Column('int', { name: 'idMunicipality', nullable: true })
  idMunicipality: number;
  @Column('varchar', { name: 'eventType' })
  eventType: string;
  @Column('varchar', { name: 'capacity', nullable: true, default: null })
  capacity: string;
  @Column('int', { name: 'idContractingClient' })
  idContractingClient: number;
  @Column('varchar', { name: 'personResponsible' })
  personResponsible: string;
  @Column('varchar', { name: 'personResponsiblePhone' })
  personResponsiblePhone: string;
  @Column('varchar', { name: 'ambulanceAccompaniment', default: '' })
  ambulanceAccompaniment: string;
  @Column('int', { name: 'idStateEvent', default: 1 })
  idStateEvent: number;
  @Column('datetime', {
    name: 'dateTimeCall',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateTimeCall: Date;

  @ManyToOne(() => StateEvent, (event) => event.events)
  @JoinColumn({ name: 'idStateEvent' })
  currentEventState: StateEvent;
  @ManyToOne(
    () => ContractingClient,
    (contractingClient) => contractingClient.medicalServices,
  )
  @JoinColumn({ name: 'idContractingClient' })
  contractingClient: ContractingClient;

  @ManyToOne(() => Municipality, (department) => department.medicalServices)
  @JoinColumn({ name: 'idMunicipality' })
  municipality: Municipality;

  @OneToOne(() => EventAssignment, (eventAssignment) => eventAssignment.event)
  eventAssignments: EventAssignment;

  @OneToMany(() => StateEventChange, (stateChange) => stateChange.event)
  stateEventChange: StateEventChange[];

  @OneToMany(() => EventSignature, (eventSignature) => eventSignature.event)
  eventSignatures: EventSignature[];

  @OneToMany(() => EventFile, (eventFile) => eventFile.event)
  eventFiles: EventFile[];

  @OneToMany(
    () => PatientEventRegister,
    (patientEventRegister) => patientEventRegister.event,
  )
  patientEventRegisters: PatientEventRegister[];
}
