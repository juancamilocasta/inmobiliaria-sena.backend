import { MedicalService } from 'src/medical-services/entities/medical-services.entity';
import { User } from 'src/users/entities/user.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('assignment')
export class Assignment {
  @PrimaryGeneratedColumn('uuid', { name: 'idAssignment' })
  idAssignment: string;
  @Column('uuid', { name: 'idMedicalService' })
  idMedicalService: string;
  @Column('uuid', { name: 'idDriver' })
  idDriver: string;
  @Column('uuid', { name: 'idMedicalAssistant', default: null })
  idMedicalAssistant: string;
  @Column('uuid', { name: 'idMedical', default: null })
  idMedical: string;
  @Column('int', { name: 'idVehicle' })
  idVehicle: number;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.assignments)
  @JoinColumn({ name: 'idVehicle' })
  vehicle: Vehicle;

  @ManyToOne(() => User, (user) => user.assignmentDrivers)
  @JoinColumn({ name: 'idDriver' })
  driver: User;

  @ManyToOne(() => User, (user) => user.assignmentMedicalAssistants)
  @JoinColumn({ name: 'idMedicalAssistant' })
  medicalAssistant: User;

  @ManyToOne(() => User, (user) => user.assignmentMedicals)
  @JoinColumn({ name: 'idMedical' })
  medical: User;

  @OneToOne(() => MedicalService, (user) => user.assignment)
  @JoinColumn({ name: 'idMedicalService' })
  medicalService: MedicalService;
}
