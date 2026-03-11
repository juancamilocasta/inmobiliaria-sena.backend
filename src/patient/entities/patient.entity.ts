import { DocumentType } from 'src/document-types/entities/document-type.entity';
import { MedicalService } from 'src/medical-services/entities/medical-services.entity';
import { Gender } from 'src/genders/entities/gender.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PatientEventRegister } from 'src/patient-event-register/entities/patient-event-register.entity';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('increment', { name: 'idPatient' })
  idPatient: number;
  @Column('int', { name: 'idDocumentType' })
  idDocumentType: number;
  @Column('varchar', { name: 'document', unique: true })
  document: string;
  @Column('varchar', { name: 'name' })
  name: string;
  @Column('varchar', { name: 'surName' })
  surName: string;
  @Column('date', { name: 'birthdate' })
  birthdate: Date;
  @Column('int', { name: 'weight', nullable: true })
  weight: number;
  @Column('int', { name: 'idGender', nullable: true })
  idGender: number;

  @ManyToOne(() => DocumentType, (documentType) => documentType.patient)
  @JoinColumn({ name: 'idDocumentType' })
  documentType: DocumentType;

  @ManyToOne(() => Gender, (gender) => gender.patients)
  @JoinColumn({ name: 'idGender' })
  gender: Gender;

  @OneToMany(() => MedicalService, (medicalServices) => medicalServices.patient)
  medicalServices: MedicalService[];

  @OneToMany(
    () => PatientEventRegister,
    (patientEventRegisters) => patientEventRegisters.patient,
  )
  patientEventRegisters: PatientEventRegister[];
}
