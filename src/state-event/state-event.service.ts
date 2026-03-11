import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StateEvent } from './entities/state-event.entity';
import { Event } from 'src/events/entities/event.entity';
import { Repository } from 'typeorm';
import { StateEventChange } from './entities/state-event-change.entity';
import { CreateStateEventChangeDto } from './dto/create-state-event-change.dto';

@Injectable()
export class StateEventService {
  private readonly logger = new Logger('StateEventService');
  constructor(
    @InjectRepository(StateEvent)
    private readonly stateEventRepository: Repository<StateEvent>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(StateEventChange)
    private readonly stateEventChangeRepository: Repository<StateEventChange>,
  ) {}

  async createStateEventChange(
    createChangeStateChangeDto: CreateStateEventChangeDto,
  ) {
    try {
      const { idEvent, idStateEvent } = createChangeStateChangeDto;

      const stateEvent = await this.stateEventRepository.findOneBy({
        idStateEvent,
      });
      const event = await this.eventRepository.findOneBy({ idEvent });
      const stateChange = new StateEventChange();
      stateChange.event = event;
      stateChange.stateEvent = stateEvent;

      await this.stateEventChangeRepository.save(stateChange);

      return {
        message: 'Estado actualizado correctamente',
        statusCode: 201,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getStatesEvent() {
    try {
      const findStateChange = await this.stateEventRepository.find({
        where: { isActive: 1 },
      });
      if (findStateChange.length === 0) {
        throw new HttpException('No existen estados', HttpStatus.NOT_FOUND);
      }
      return {
        stateChange: findStateChange,
        statusCode: 200,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
