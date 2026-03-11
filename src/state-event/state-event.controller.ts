import { Body, Controller, Get, Post } from '@nestjs/common';
import { StateEventService } from './state-event.service';
import { CreateStateEventChangeDto } from './dto/create-state-event-change.dto';

@Controller('state-event')
export class StateEventController {
  constructor(private readonly stateEventService: StateEventService) {}
  @Post('create-state-event-change')
  async createStateEventChange(
    @Body() createStateEventChangeDto: CreateStateEventChangeDto,
  ) {
    return this.stateEventService.createStateEventChange(
      createStateEventChangeDto,
    );
  }

  @Get()
  async getStatesEvent() {
    return this.stateEventService.getStatesEvent();
  }
}
