
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment', { name: 'idUser' })
  idUser: string;
  @Column('varchar', { name: 'userNames' })
  userNames: string;
  @Column('varchar', { name: 'lastNames' })
  lastName: string;
  @Column('varchar', { name: 'identification', unique: true })
  identification: string;
  @Column('varchar', { name: 'password', select: false })
  password: string;
  @Column('tinyint', { name: 'active', default: 1 })
  active: number;
  @Column('datetime', { name: 'dateCreated', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated: string;


}
