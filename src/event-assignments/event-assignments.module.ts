import { Module } from '@nestjs/common';
import { EventAssignmentsService } from './event-assignments.service';
import { EventAssignmentsController } from './event-assignments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventAssignment } from './entities/event-assignment.entity';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([EventAssignment]), EventsModule],
  controllers: [EventAssignmentsController],
  providers: [EventAssignmentsService],
  exports: [EventAssignmentsService],
})
export class EventAssignmentsModule {}
