import { ContractingClient } from 'src/contracting-clients/entities/contracting-client.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('taxDetails')
export class TaxDetail {
  @PrimaryGeneratedColumn('increment', { name: 'idTaxDetail' })
  idTaxDetail: number;
  @Column('varchar', { name: 'code' })
  code: string;
  @Column('varchar', { name: 'description' })
  description: string;
  @Column('tinyint', { name: 'active', default: true })
  isActive: boolean;
  @OneToMany(
    () => ContractingClient,
    (contractingClient) => contractingClient.taxDetail,
  )
  contractingClients: ContractingClient[];
}
