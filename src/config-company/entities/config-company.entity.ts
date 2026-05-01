import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('configCompany')
export class ConfigCompany {
  @PrimaryGeneratedColumn('increment', { name: 'idConfigCompany' })
  idConfigCompany: number;
  @Column('varchar', { name: 'name' })
  name: string;
  @Column('varchar', { name: 'nit' })
  nit: string;
  @Column('varchar', { name: 'legalName' })
  legalName: string;
  @Column('varchar', { name: 'address' })
  address: string;
  @Column('varchar', { name: 'phone' })
  phone: string;
  @Column('int', { name: 'usersLimit' })
  usersLimit: number;
  @Column('varchar', { name: 'logo' })
  logo: string;
  @Column('varchar', { name: 'email' })
  email: string;
  @Column('varchar', { name: 'cellphone' })
  cellphone: string;
}
