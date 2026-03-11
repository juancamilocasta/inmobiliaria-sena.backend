import { Relationship } from 'src/relationships/entities/relationship.entity';
import { DocumentType } from 'src/document-types/entities/document-type.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MedicalService } from 'src/medical-services/entities/medical-services.entity';

@Entity('accompanyingPerson')
export class AccompanyingPerson {
  @PrimaryGeneratedColumn('increment', { name: 'idAccompanyingPerson' })
  idAccompanyingPerson: number;
  @Column('int', { name: 'idDocumentType' })
  idDocumentType: number;
  @Column('varchar', { name: 'document' })
  document: string;
  @Column('varchar', { name: 'fullName' })
  fullName: string;
  @Column('varchar', { name: 'phone' })
  phone: string;
  @Column('int', { name: 'idRelationship' })
  idRelationship: number;
  @Column('date', { name: 'creationDate' })
  createtionDate: string;
  @Column('date', { name: 'updatedDate' })
  updatedDate: string;
  @Column('varchar', { name: 'idMedicalService', unique: true })
  idMedicalService: string;

  @ManyToOne(
    () => DocumentType,
    (documentType) => documentType.accompanyingPersons,
  )
  @JoinColumn({ name: 'idDocumentType' })
  documentType: DocumentType;

  @ManyToOne(
    () => Relationship,
    (relationship) => relationship.accompanyingPersons,
  )
  @JoinColumn({ name: 'idRelationship' })
  relationship: Relationship;

  @OneToOne(
    () => MedicalService,
    (medicalService) => medicalService.accompanyingPerson,
  )
  @JoinColumn({ name: 'idMedicalService' })
  medicalService: MedicalService;
}
