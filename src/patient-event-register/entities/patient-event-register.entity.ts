import { Event } from 'src/events/entities/event.entity';
import { PatientEventFile } from 'src/files/entities/patient-event-files.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('patientEventRegister')
export class PatientEventRegister {
  @PrimaryGeneratedColumn('uuid', { name: 'idPatientEventRegister' })
  idPatientEventRegister: string;
  @Column('int', { name: 'idPatient' })
  idPatient: number;
  @Column('uuid', { name: 'idEvent' })
  idEvent: string;
  @Column('varchar', { name: 'agePatient' })
  agePatient: string;
  @Column('int', { name: 'idDiagnosis' })
  idDiagnosis: number;
  @Column('varchar', { name: 'descriptionFindings' })
  descriptionFindings: string;
  @Column('datetime', { name: 'dateCreated' })
  dateCreated: string;

  @ManyToOne(() => Event, (event) => event.patientEventRegisters)
  @JoinColumn({ name: 'idEvent' })
  event: Event;

  @ManyToOne(() => Patient, (patient) => patient.patientEventRegisters)
  @JoinColumn({ name: 'idPatient' })
  patient: Patient;

  @OneToMany(
    () => PatientEventFile,
    (patienteventFile) => patienteventFile.patientEventRegister,
  )
  patienteventFiles: PatientEventFile[];
}
