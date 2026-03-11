import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('technicalServices')
export class TechnicalService {
  @PrimaryGeneratedColumn('increment', { name: 'idTechnicalService' })
  idTechnicalService: number;
  @Column('varchar', { name: 'case' })
  case: string;
  @Column('varchar', { name: 'message' })
  message: string;
  @Column('int', { name: 'idUser' })
  idUser: number;
  @Column('date', {
    name: 'dateTechnicalService',
    default: () => 'NOW()',
  })
  dateTechnicalService: Date;
  @ManyToOne(() => User, (user) => user.technicalServices)
  @JoinColumn({ name: 'idUser' })
  user: User;
}
