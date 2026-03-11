import { Assignment } from 'src/assignment/entities/assignment.entity';
import { Diagnosis } from 'src/diagnosis/entities/diagnosis.entity';
import { Eps } from 'src/eps/entities/eps.entity';
import { Municipality } from 'src/municipality/entities/municipality.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { ContractingClient } from 'src/contracting-clients/entities/contracting-client.entity';
import { ServiceType } from 'src/service-type/entities/service-type.entity';
import { StateMedicalServicesChange } from 'src/state-medical-services/entities/medical-services-state-change.entity';
import { Support } from 'src/supports/entities/supports.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PopulationZone } from 'src/populationZones/entities/population-zone.entity';
import { VinculationType } from 'src/vinculation-types/entities/vinculation-type.entity';
import { StateMedicalService } from 'src/state-medical-services/entities/state-medical-services.entity';
import { InsulationType } from 'src/insulation-types/entities/insulation-type.entity';
import { SatisfactionSurvey } from 'src/satisfaction-survey/entities/satisfaction-survey.entity';
import { MedicalServiceSignature } from 'src/medical-service-signatures/entities/medical-service-signature.entity';
import { TransferFile } from 'src/files/entities/transfer-files.entity';
import { MedicalRecord } from 'src/medical-record/entities/medical-record.entity';
import { ChecklistTabTam } from 'src/checklist-tab-tam/entities/checklist-tab-tam.entity';
import { AccompanyingPerson } from 'src/accompanying-person/entities/accompanying-person.entity';
import { InformedConsent } from 'src/informed-consent/entities/informed-consent.entity';
import { DestinationsMedicalService } from 'src/destinations-medical-services/entities/destinations-medical-service.entity';

@Entity('medicalServices')
export class MedicalService {
  @PrimaryGeneratedColumn('uuid', { name: 'idMedicalService' })
  idMedicalService: string;
  @Column('varchar', { name: 'collect' })
  collect: string; //patient ubication
  @Column('varchar', { name: 'destination' })
  destination: string;
  @Column('datetime', {
    name: 'dateTimeCall',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateTimeCall: Date;
  @Column('int', { name: 'idContractingClient' })
  idContractingClient: number;
  @Column('varchar', { name: 'clientContact' })
  clientContact: string;
  @Column('varchar', { name: 'clientContactPhone' })
  clientContactPhone: string;
  @Column('int', { name: 'idServiceType' })
  idServiceType: number;
  @Column('int', { name: 'idPatient' })
  idPatient: number;
  @Column('int', { name: 'idMunicipality', nullable: true, default: null })
  idMunicipality: number;
  @Column('int', { name: 'idEps' })
  idEps: number;
  @Column('int', { name: 'idVinculationType' })
  idVinculationType: number;
  @Column('int', { name: 'idDiagnosis' })
  idDiagnosis: number;
  @Column('datetime', { name: 'dateProgrammed' })
  dateProgrammed: Date;
  @Column('int', { name: 'idPopulationZone', nullable: true })
  idPopulationZone: number;
  @Column('varchar', { name: 'insurance', nullable: true })
  insurance: string;
  @Column('varchar', { name: 'clinicalRecord', nullable: true })
  clinicalRecord: string;
  @Column('int', { name: 'idStateMedicalService', default: 1 })
  idStateMedicalService: number;
  @Column('tinyint', { name: 'ventilated', default: 0 })
  ventilated: number;
  @Column('varchar', { name: 'ventilatedType', default: null })
  ventilatedType: string;
  @Column('tinyint', { name: 'isolated', default: 0 })
  isolated: number;

  @ManyToOne(() => Patient, (patient) => patient.medicalServices)
  @JoinColumn({ name: 'idPatient' })
  patient: Patient;

  @ManyToOne(() => StateMedicalService, (state) => state.medicalServices)
  @JoinColumn({ name: 'idStateMedicalService' })
  currentState: StateMedicalService;

  @OneToMany(
    () => StateMedicalServicesChange,
    (stateChange) => stateChange.medicalService,
  )
  stateChange: StateMedicalServicesChange[];

  @ManyToMany(() => Support)
  @JoinTable({
    name: 'medicalServicesSupports',
    joinColumn: {
      name: 'idMedicalService',
      referencedColumnName: 'idMedicalService',
    },
    inverseJoinColumn: {
      name: 'idSupport',
      referencedColumnName: 'idSupport',
    },
  })
  supports: Support[];

  @ManyToMany(() => InsulationType)
  @JoinTable({
    name: 'medicalServicesInsulationTypes',
    joinColumn: {
      name: 'idMedicalService',
      referencedColumnName: 'idMedicalService',
    },
    inverseJoinColumn: {
      name: 'idInsulationType',
      referencedColumnName: 'idInsulationType',
    },
  })
  insulationTypes: InsulationType[];

  @ManyToOne(() => Eps, (eps) => eps.medicalServices)
  @JoinColumn({ name: 'idEps' })
  eps: Eps;

  @ManyToOne(
    () => VinculationType,
    (vinculationType) => vinculationType.medicalServices,
  )
  @JoinColumn({ name: 'idVinculationType' })
  vinculationType: VinculationType;

  @ManyToOne(() => Diagnosis, (diagnosis) => diagnosis.medicalServices)
  @JoinColumn({ name: 'idDiagnosis' })
  diagnosis: Diagnosis;

  @ManyToOne(() => ServiceType, (serviceType) => serviceType.medicalServices)
  @JoinColumn({ name: 'idServiceType' })
  serviceType: ServiceType;

  @ManyToOne(
    () => ContractingClient,
    (contractingClient) => contractingClient.medicalServices,
  )
  @JoinColumn({ name: 'idContractingClient' })
  contractingClient: ContractingClient;

  @OneToOne(() => Assignment, (assignment) => assignment.medicalService)
  assignment: Assignment;

  @OneToOne(
    () => SatisfactionSurvey,
    (satisfactionSurvey) => satisfactionSurvey.medicalService,
  )
  satisfactionSurvey: SatisfactionSurvey;

  @ManyToOne(() => Municipality, (department) => department.medicalServices)
  @JoinColumn({ name: 'idMunicipality' })
  municipality: Municipality;

  @ManyToOne(
    () => PopulationZone,
    (populationZone) => populationZone.medicalServices,
  )
  @JoinColumn({ name: 'idPopulationZone' })
  populationZone: PopulationZone;

  @OneToMany(
    () => MedicalServiceSignature,
    (medicalServiceSignature) => medicalServiceSignature.medicalService,
  )
  medicalServiceSignatures: MedicalServiceSignature[];

  @OneToMany(() => TransferFile, (transferFile) => transferFile.medicalService)
  transferFiles: TransferFile[];
  @OneToOne(() => ChecklistTabTam, (checklist) => checklist.medicalService)
  checklistTabTam: ChecklistTabTam;

  @OneToOne(
    () => AccompanyingPerson,
    (accompanyingPerson) => accompanyingPerson.medicalService,
  )
  accompanyingPerson: AccompanyingPerson;

  @OneToOne(
    () => InformedConsent,
    (informedConsent) => informedConsent.medicalService,
  )
  informedConsent: InformedConsent;
  @OneToOne(
    () => MedicalRecord,
    (medicalRecord) => medicalRecord.medicalService,
  )
  medicalRecord: MedicalRecord;
  @OneToMany(
    () => DestinationsMedicalService,
    (destinationsMedicalService) => destinationsMedicalService.medicalService,
  )
  destinationsMedicalServices: DestinationsMedicalService[];
}
