import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StateEvent } from './state-event.entity';
import { Event } from 'src/events/entities/event.entity';

@Entity('stateEventChanges')
export class StateEventChange {
  @PrimaryGeneratedColumn('increment', { name: 'idStateEventChange' })
  idStateEventChange: number;
  @Column('uuid', { name: 'idEvent' })
  idEvent: string;
  @Column('int', { name: 'idStateEvent' })
  idStateEvent: number;
  @Column('datetime', {
    name: 'dateTimeChange',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateTimeChange: Date;

  @ManyToOne(() => StateEvent, (event) => event.stateEventChange)
  @JoinColumn({ name: 'idStateEvent' })
  stateEvent: StateEvent;

  @ManyToOne(() => Event, (event) => event.stateEventChange)
  @JoinColumn({ name: 'idEvent' })
  event: Event;
}
