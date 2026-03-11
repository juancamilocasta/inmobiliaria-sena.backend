import { ContractingClient } from 'src/contracting-clients/entities/contracting-client.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('personTypes')
export class PersonType {
  @PrimaryGeneratedColumn('increment', { name: 'idPersonType' })
  idPersonType: number;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @Column('tinyint', { name: 'active', default: true })
  active: boolean;
  @OneToMany(
    () => ContractingClient,
    (contractingClient) => contractingClient.personType,
  )
  contractingClients: ContractingClient[];
}
