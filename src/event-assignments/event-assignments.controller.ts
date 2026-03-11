import { Body, Controller, Param, Post } from '@nestjs/common';
import { EventAssignmentsService } from './event-assignments.service';
import { CreateEventAssignmentsDto } from './dto/create-event-assignments.dto';
import { UpdateEventAssignmentsDto } from './dto/update-event-assignments.dto';

@Controller('event-assignments')
export class EventAssignmentsController {
  constructor(
    private readonly eventAssignmentsService: EventAssignmentsService,
  ) {}

  @Post()
  create(@Body() createEventAssignmentsDto: CreateEventAssignmentsDto) {
    return this.eventAssignmentsService.create(createEventAssignmentsDto);
  }
  @Post('update/:idEventAssignment')
  update(
    @Param('idEventAssignment') idEventAssignment: string,
    @Body() updateEventAssignmentsDto: UpdateEventAssignmentsDto,
  ) {
    return this.eventAssignmentsService.update(
      idEventAssignment,
      updateEventAssignmentsDto,
    );
  }
}
