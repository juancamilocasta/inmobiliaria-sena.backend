import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('supports')
export class Support {
  @PrimaryGeneratedColumn('increment', { name: 'idSupport' })
  idSupport: number;
  @Column('varchar', { name: 'description', unique: true })
  description: string;
  @Column('tinyint', { name: 'active', default: true })
  active: boolean;
}
