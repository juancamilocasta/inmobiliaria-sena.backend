import { Municipality } from 'src/municipality/entities/municipality.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn('increment', { name: 'idDepartment' })
  idDepartment: number;
  @Column('varchar', { name: 'code', unique: true, length: 2 })
  code: string;
  @Column('varchar', { name: 'description', unique: true })
  description: string;
  @Column('tinyint', { name: 'active', default: true })
  active: boolean;
  @OneToMany(() => Municipality, (municipio) => municipio.department)
  municipalities: Municipality[];
}
