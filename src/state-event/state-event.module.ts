import { Module } from '@nestjs/common';
import { StateEventService } from './state-event.service';
import { StateEventController } from './state-event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateEvent } from './entities/state-event.entity';
import { StateEventChange } from './entities/state-event-change.entity';
import { Event } from 'src/events/entities/event.entity';

@Module({
  controllers: [StateEventController],
  providers: [StateEventService],
  exports: [StateEventService],
  imports: [TypeOrmModule.forFeature([StateEvent, StateEventChange, Event])],
})
export class StateEventModule {}
