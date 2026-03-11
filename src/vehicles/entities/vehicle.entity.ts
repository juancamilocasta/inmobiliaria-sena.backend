import { Assignment } from 'src/assignment/entities/assignment.entity';
import { EventAssignment } from 'src/event-assignments/entities/event-assignment.entity';
import { VehiclesType } from 'src/vehicles-type/entities/vehicles-type.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('increment', { name: 'idVehicle' })
  idVehicle: number;

  @Column('int', { name: 'idVehicleType' })
  idVehicleType: number;

  @Column('varchar', { name: 'plaque', unique: true })
  plaque: string;

  @Column('date', { name: 'dateSoatVigency' })
  dateSoatVigency: Date;

  @Column('date', { name: 'dateTecnicomecanicVigency' })
  dateTecnicomecanicVigency: Date;

  @Column('tinyint', { name: 'active', default: 1 })
  active: number;

  @ManyToOne(() => VehiclesType, (vehiclesType) => vehiclesType.vehicles)
  @JoinColumn({ name: 'idVehicleType' })
  vehiclesType: VehiclesType;

  @OneToMany(() => Assignment, (assignment) => assignment.vehicle)
  assignments: Assignment;

  @OneToMany(() => EventAssignment, (assignment) => assignment.vehicle)
  eventAssignments: EventAssignment[];
}
