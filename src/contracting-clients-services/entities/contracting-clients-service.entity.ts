import { ContractingClient } from 'src/contracting-clients/entities/contracting-client.entity';
import { ServiceType } from 'src/service-type/entities/service-type.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('contractingClientsServices')
export class ContractingClientsService {
  @PrimaryGeneratedColumn('increment', { name: 'idContractingClientService' })
  idContractingClientService: number;
  @Column('int', { name: 'idContractingClient' })
  idContractingClient: number;
  @Column('int', { name: 'idServiceType' })
  idServiceType: number;
  @Column('varchar', { name: 'value' })
  value: string;
  @Column('tinyint', { name: 'active', default: true })
  active: boolean;
  @ManyToOne(
    () => ContractingClient,
    (contractingClient) => contractingClient.contractingClientsServices,
  )
  @JoinColumn({ name: 'idContractingClient' })
  contractingClient: ContractingClient;

  @ManyToOne(
    () => ServiceType,
    (serviceType) => serviceType.contractingClientsServices,
  )
  @JoinColumn({ name: 'idServiceType' })
  serviceType: ServiceType;
}
