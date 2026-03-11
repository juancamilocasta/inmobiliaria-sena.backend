import { Diagnosis } from 'src/diagnosis/entities/diagnosis.entity';
import { MaritalStatus } from 'src/marital-status/entities/marital-status.entity';
import { MedicalService } from 'src/medical-services/entities/medical-services.entity';
import { Municipality } from 'src/municipality/entities/municipality.entity';
import { OriginAttention } from 'src/origin-attention/entities/origin-attention.entity';
import { PhysicalExamination } from 'src/physical-examination/entities/physical-examination.entity';
import { PopulationZone } from 'src/populationZones/entities/population-zone.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('medicalRecord')
export class MedicalRecord {
  @PrimaryGeneratedColumn('uuid', { name: 'idMedicalRecord' })
  idMedicalRecord: string;
  @Column('uuid', { name: 'idMedicalService' })
  idMedicalService: string;
  @Column('varchar', { name: 'agePatient' })
  agePatient: string;
  @Column('varchar', { name: 'occupationPatient' })
  occupationPatient: string;
  @Column('int', { name: 'idMaritalStatusPatient', nullable: true })
  idMaritalStatusPatient: number;
  @Column('varchar', { name: 'phonePatient' })
  phonePatient: string;
  @Column('int', { name: 'idMunicipalityResidencePatient', nullable: true })
  idMunicipalityResidencePatient: number;
  @Column('int', { name: 'idPopulationZoneResidencePatient', nullable: true })
  idPopulationZoneResidencePatient: number;
  @Column('varchar', { name: 'usualAddressPatient' })
  usualAddressPatient: string;
  @Column('int', { name: 'idOrignAttention', nullable: true })
  idOrignAttention: number;
  @Column('varchar', { name: 'otherOrignAttention' })
  otherOrignAttention: string;
  @Column('varchar', { name: 'allergicsHistory' })
  allergicsHistory: string;
  @Column('varchar', { name: 'medicationsHistory' })
  medicationsHistory: string;
  @Column('varchar', { name: 'surgicalHistory' })
  surgicalHistory: string;
  @Column('varchar', { name: 'pathologicalHistory' })
  pathologicalHistory: string;
  @Column('varchar', { name: 'proceduresCarriedTransfer' })
  proceduresCarriedTransfer: string;
  @Column('varchar', { name: 'statePatientReceived' })
  statePatientReceived: string;
  @Column('varchar', { name: 'statePatientDelivered' })
  statePatientDelivered: string;
  @Column('int', { name: 'idDiagnosis', nullable: true })
  idDiagnosis: number;
  @Column('varchar', { name: 'medicalOrders' })
  medicalOrders: string;
  @Column('int', { name: 'numberWaitingHours' })
  numberWaitingHours: number;
  @Column('varchar', { name: 'reasonHoursWaiting' })
  reasonHoursWaiting: string;
  @Column('datetime', { name: 'dateCreationMedicalRecord' })
  dateCreationMedicalRecord: string;
  @Column('varchar', { name: 'inCaseRejectPatientDocument' })
  inCaseRejectPatientDocument: string;
  @Column('varchar', { name: 'inCaseRejectWitnessDocument' })
  inCaseRejectWitnessDocument: string;
  @Column('int', { name: 'recordNumber' })
  recordNumber: number;
  @Column('enum', { name: 'sedatedPatient', enum: ['SI', 'NO'] })
  sedatedPatient: string;
  @Column('varchar', { name: 'responseSedatedPatient' })
  responseSedatedPatient: string;

  @OneToOne(
    () => MedicalService,
    (medicalService) => medicalService.medicalRecord,
  )
  @JoinColumn({ name: 'idMedicalService' })
  medicalService: MedicalService;

  @OneToMany(
    () => PhysicalExamination,
    (physicalExamination) => physicalExamination.medicalRecord,
  )
  physicalExaminations: PhysicalExamination[];

  @ManyToOne(
    () => MaritalStatus,
    (maritalStatus) => maritalStatus.medicalRecords,
  )
  @JoinColumn({ name: 'idMaritalStatusPatient' })
  maritalStatus: MaritalStatus;

  @ManyToOne(
    () => Municipality,
    (municipality) => municipality.medicalRecordsResidence,
  )
  @JoinColumn({ name: 'idMunicipalityResidencePatient' })
  municipalityResidencePatient: Municipality;
  @ManyToOne(
    () => PopulationZone,
    (populationZone) => populationZone.medicalRecordsResidence,
  )
  @JoinColumn({ name: 'idPopulationZoneResidencePatient' })
  populationZoneResidencePatient: PopulationZone;

  @ManyToOne(
    () => OriginAttention,
    (orignAttention) => orignAttention.medicalRecords,
  )
  @JoinColumn({ name: 'idOrignAttention' })
  orignAttention: OriginAttention;

  @ManyToOne(() => Diagnosis, (diagnosis) => diagnosis.medicalRecords)
  @JoinColumn({ name: 'idDiagnosis' })
  diagnosis: Diagnosis;
}
