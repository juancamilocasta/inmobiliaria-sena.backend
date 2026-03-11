import { Event } from 'src/events/entities/event.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('eventSignatures')
export class EventSignature {
  @PrimaryGeneratedColumn('increment', { name: 'idEventSignature' })
  idEventSignature: number;
  @Column('uuid', { name: 'idEvent' })
  idEvent: string;
  @Column('uuid', { name: 'signingUserId' })
  signingUserId: string;
  @Column('uuid', { name: 'approvingUserId' })
  approvingUserId: string;
  @Column('datetime', {
    name: 'createdAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
  @Column('tinyint', { name: 'active', default: 1 })
  active: number;

  @ManyToOne(() => Event, (user) => user.eventSignatures)
  @JoinColumn({ name: 'idEvent' })
  event: Event;

  @ManyToOne(() => User, (user) => user.signingEventUsers)
  @JoinColumn({ name: 'signingUserId' })
  signingUser: User;

  @ManyToOne(() => User, (user) => user.approvingEventUsers)
  @JoinColumn({ name: 'approvingUserId' })
  approvingUser: User;
}
