import { ContractingClient } from 'src/contracting-clients/entities/contracting-client.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clientTypes')
export class ClientType {
  @PrimaryGeneratedColumn('increment', { name: 'idClientType' })
  idClientType: number;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @Column('tinyint', { name: 'active', default: true })
  active: boolean;

  @OneToMany(
    () => ContractingClient,
    (contractingClient) => contractingClient.clientType,
  )
  contractingClients: ContractingClient[];
}
