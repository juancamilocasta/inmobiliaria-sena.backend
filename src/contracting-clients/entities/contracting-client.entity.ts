import { Event } from 'src/events/entities/event.entity';
import { ContractingClientsService } from 'src/contracting-clients-services/entities/contracting-clients-service.entity';
import { MedicalService } from 'src/medical-services/entities/medical-services.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClientType } from 'src/client-types/entities/client-type.entity';
import { PersonType } from 'src/person-types/entities/person-type.entity';
import { DocumentType } from 'src/document-types/entities/document-type.entity';
import { TaxResponsibility } from 'src/tax-responsibilities/entities/tax-responsibility.entity';
import { TaxDetail } from 'src/tax-details/entities/tax-detail.entity';
import { Municipality } from 'src/municipality/entities/municipality.entity';

@Entity('contractingClients')
export class ContractingClient {
  @PrimaryGeneratedColumn('increment', { name: 'idContractingClient' })
  idContractingClient: number;
  @Column('varchar', { name: 'description' })
  description: string;
  @Column('int', { name: 'idClientType' })
  idClientType: number;
  @Column('int', { name: 'idPersonType' })
  idPersonType: number;
  @Column('int', { name: 'idDocumentType' })
  idDocumentType: number;
  @Column('varchar', { name: 'documentNumber', unique: true })
  documentNumber: string;
  @Column('int', { name: 'idTaxDetail' })
  idTaxDetail: number;
  @Column('int', { name: 'idTaxResponsibility' })
  idTaxResponsibility: number;
  @Column('varchar', { name: 'email', unique: true })
  email: string;
  @Column('varchar', { name: 'countryCode' })
  countryCode: number;
  @Column('number', { name: 'idMunicipality' })
  idMunicipality: number;
  @Column('varchar', { name: 'idPostalCode' })
  idPostalCode: number;
  @Column('tinyint', { name: 'active' })
  active: boolean;

  @OneToMany(
    () => MedicalService,
    (medicalServices) => medicalServices.contractingClient,
  )
  medicalServices: MedicalService[];

  @OneToMany(() => Event, (event) => event.contractingClient)
  events: Event[];
  @OneToMany(
    () => ContractingClientsService,
    (contractingClientsService) => contractingClientsService.contractingClient,
  )
  contractingClientsServices: ContractingClientsService[];
  @ManyToOne(() => ClientType, (clientType) => clientType.contractingClients)
  @JoinColumn({ name: 'idClientType' })
  clientType: ClientType;

  @ManyToOne(() => PersonType, (personType) => personType.contractingClients)
  @JoinColumn({ name: 'idPersonType' })
  personType: PersonType;

  @ManyToOne(() => TaxResponsibility)
  @JoinColumn({ name: 'idTaxResponsibility' })
  taxResponsibility: TaxResponsibility;

  @ManyToOne(() => TaxDetail)
  @JoinColumn({ name: 'idTaxDetail' })
  taxDetail: TaxDetail;

  @ManyToOne(
    () => DocumentType,
    (documentType) => documentType.contractingClients,
  )
  @JoinColumn({ name: 'idDocumentType' })
  documentType: DocumentType;

  @ManyToOne(() => Municipality)
  @JoinColumn({ name: 'idMunicipality' })
  municipality: Municipality;
}
