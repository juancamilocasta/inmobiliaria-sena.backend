import { Assignment } from 'src/assignment/entities/assignment.entity';
import { DocumentType } from 'src/document-types/entities/document-type.entity';
import { EventAssignment } from 'src/event-assignments/entities/event-assignment.entity';
import { EventSignature } from 'src/event-signatures/entities/event-signature.entity';
import { MedicalServiceSignature } from 'src/medical-service-signatures/entities/medical-service-signature.entity';
import { Role } from 'src/roles/entities/role.entity';
import { TechnicalService } from 'src/technical-services/entities/technical-service.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'idUser' })
  idUser: string;
  @Column('varchar', { name: 'userName' })
  userName: string;
  @Column('varchar', { name: 'lastName' })
  lastName: string;
  @Column('int', { name: 'idDocumentType' })
  idDocumentType: number;
  @Column('varchar', { name: 'identification', unique: true })
  identification: string;
  @Column('int', { name: 'idRole' })
  idRole: number;
  @Column('tinyint', { name: 'isActive', default: 1 })
  isActive: number;
  @Column('varchar', { name: 'password', select: false })
  password: string;
  @Column('varchar', { name: 'phone' })
  phone: string;
  @Column('varchar', { name: 'registrationNumber' })
  registrationNumber: string;
  @Column('varchar', { name: 'signatureFileName' })
  signatureFileName: string;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'idRole' })
  role: Role;
  @ManyToOne(() => DocumentType, (documentType) => documentType.users)
  @JoinColumn({ name: 'idDocumentType' })
  documentType: DocumentType;

  @OneToMany(() => Assignment, (assignment) => assignment.driver)
  assignmentDrivers: Assignment[];
  @OneToMany(() => Assignment, (assignment) => assignment.medicalAssistant)
  assignmentMedicalAssistants: Assignment[];
  @OneToMany(() => Assignment, (assignment) => assignment.medical)
  assignmentMedicals: Assignment[];
  @OneToMany(
    () => TechnicalService,
    (technicalService) => technicalService.user,
  )
  technicalServices: TechnicalService[];

  @OneToMany(
    () => EventAssignment,
    (eventAssignment) => eventAssignment.idMedical,
  )
  medicalEventAssignments: EventAssignment[];
  @OneToMany(
    () => EventAssignment,
    (eventAssignment) => eventAssignment.idMedicalAssistant,
  )
  medicalAssistantEventAssignments: EventAssignment[];
  @OneToMany(
    () => EventAssignment,
    (eventAssignment) => eventAssignment.idDriver,
  )
  driverEventAssignments: EventAssignment[];

  @OneToMany(
    () => MedicalServiceSignature,
    (medicalServiceSignature) => medicalServiceSignature.signingUser,
  )
  signingUsers: MedicalServiceSignature[];
  @OneToMany(
    () => MedicalServiceSignature,
    (medicalServiceSignature) => medicalServiceSignature.approvingUser,
  )
  approvingUsers: MedicalServiceSignature[];

  @OneToMany(
    () => EventSignature,
    (medicalServiceSignature) => medicalServiceSignature.signingUser,
  )
  signingEventUsers: EventSignature[];
  @OneToMany(
    () => EventSignature,
    (medicalServiceSignature) => medicalServiceSignature.approvingUser,
  )
  approvingEventUsers: EventSignature[];
}
