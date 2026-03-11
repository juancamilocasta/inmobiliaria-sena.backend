import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('insulationTypes')
export class InsulationType {
  @PrimaryGeneratedColumn('increment', { name: 'idInsulationType' })
  idInsulationType: number;
  @Column('varchar', { name: 'descriptionInsulationType', unique: true })
  descriptionInsulationType: string;
  @Column('tinyint', { name: 'activeInsulationType', default: 1 })
  activeInsulationType: number;
}
