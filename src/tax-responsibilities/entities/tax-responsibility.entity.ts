import { ContractingClient } from 'src/contracting-clients/entities/contracting-client.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('taxResponsibility')
export class TaxResponsibility {
  @PrimaryGeneratedColumn('increment', { name: 'idTaxResponsibility' })
  idTaxResponsibility: number;
  @Column('varchar', { name: 'code' })
  code: string;
  @Column('varchar', { name: 'description' })
  description: string;
  @Column('tinyint', { name: 'active', default: true })
  isActive: boolean;
  @OneToMany(
    () => ContractingClient,
    (contractingClient) => contractingClient.taxResponsibility,
  )
  contractingClients: ContractingClient[];
}
