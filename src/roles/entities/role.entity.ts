import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('increment', { name: 'idRole' })
  idRole: number;
  @Column('varchar', { name: 'descriptionRole' })
  descriptionRole: string;
  @Column('tinyint', { name: 'active' })
  active: number;
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
