import { AccompanyingPerson } from 'src/accompanying-person/entities/accompanying-person.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('relationships')
export class Relationship {
  @PrimaryGeneratedColumn('increment', { name: 'idRelationship' })
  idRelationship: number;

  @Column('varchar', { name: 'name', unique: true })
  name: string;

  @Column('tinyint', { name: 'active', default: true })
  active: boolean;

  @OneToMany(
    () => AccompanyingPerson,
    (accompanyingPerson) => accompanyingPerson.documentType,
  )
  accompanyingPersons: AccompanyingPerson[];
}
