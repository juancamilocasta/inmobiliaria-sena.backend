import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StateEventChange } from './state-event-change.entity';
import { Event } from 'src/events/entities/event.entity';

@Entity('stateEvent')
export class StateEvent {
  @PrimaryGeneratedColumn('increment', { name: 'idStateEvent' })
  idStateEvent: number;
  @Column('varchar', { name: 'state', unique: true })
  state: string;

  @Column('varchar', { name: 'color', unique: true })
  color: string;

  @Column('tinyint', { name: 'isActive', default: 1 })
  isActive: number;

  @Column('tinyint', { name: 'readOnlyState', default: 0 })
  readOnlyState: number;
  @OneToMany(() => StateEventChange, (stateEvent) => stateEvent.event)
  stateEventChange: StateEventChange[];
  @OneToMany(() => Event, (event) => event.currentEventState)
  events: Event[];
}
