import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractingClient } from 'src/contracting-clients/entities/contracting-client.entity';
import { Municipality } from 'src/municipality/entities/municipality.entity';
import { Event } from './entities/event.entity';
import { StateEventModule } from 'src/state-event/state-event.module';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  imports: [
    StateEventModule,
    TypeOrmModule.forFeature([ContractingClient, Municipality, Event]),
  ],
  exports: [TypeOrmModule, EventsService],
})
export class EventsModule {}
