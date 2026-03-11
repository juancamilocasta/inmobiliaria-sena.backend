import { Patient } from 'src/patient/entities/patient.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('genders')
export class Gender {
  @PrimaryGeneratedColumn('increment', { name: 'idGender' })
  idGender: number;
  @Column('varchar', { name: 'description', unique: true })
  description: string;
  @Column('tinyint', { name: 'active', default: 1 })
  active: number;
  @Column('char', { name: 'codeMin', length: 2 })
  codeMin: string;

  @OneToMany(() => Patient, (patient) => patient.gender)
  patients: Patient[];
}
