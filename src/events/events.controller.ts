import { Body, Controller, Param, Post } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { GetEventByDateDto } from './dto/get-event-by-date.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }
  @Post('update/:idEvent')
  updateEvent(
    @Param('idEvent') idEvent: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventsService.updateEvent(idEvent, updateEventDto);
  }

  @Post('get-events-by-date-range')
  getEventsByDateRange(@Body() getEventByDateRangeDto: any) {
    return this.eventsService.getEventsByDateRange(getEventByDateRangeDto);
  }

  @Post('get-events-by-date')
  getEventsByDate(@Body() getEventByDateDto: GetEventByDateDto) {
    return this.eventsService.getEventsByDate(getEventByDateDto);
  }
}
