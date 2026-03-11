import { Event } from 'src/events/entities/event.entity';
import { User } from 'src/users/entities/user.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('eventAssignments')
export class EventAssignment {
  @PrimaryGeneratedColumn('uuid', { name: 'idEventAssignment' })
  idEventAssignment: string;
  @Column('uuid', { name: 'idEvent', unique: true })
  idEvent: string;
  @Column('uuid', { name: 'idMedical', default: null })
  idMedical: string;
  @Column('uuid', { name: 'idMedicalAssistant', default: null })
  idMedicalAssistant: string;
  @Column('uuid', { name: 'idDriver' })
  idDriver: string;
  @Column('int', { name: 'idVehicle' })
  idVehicle: number;

  @ManyToOne(() => Event, (event) => event.eventAssignments)
  @JoinColumn({ name: 'idEvent' })
  event: Event;

  @ManyToOne(() => User, (user) => user.medicalEventAssignments)
  @JoinColumn({ name: 'idMedical' })
  medical: User;

  @ManyToOne(() => User, (user) => user.medicalAssistantEventAssignments)
  @JoinColumn({ name: 'idMedicalAssistant' })
  medicalAssistant: User;

  @ManyToOne(() => User, (user) => user.driverEventAssignments)
  @JoinColumn({ name: 'idDriver' })
  driver: User;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.eventAssignments)
  @JoinColumn({ name: 'idVehicle' })
  vehicle: Vehicle;
}
