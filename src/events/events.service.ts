import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Between, Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { GetEventByDateRangeDto } from './dto/get-event-by-date-range.dto';
import * as moment from 'moment';
import { StateEventService } from 'src/state-event/state-event.service';
import { ConfigService } from '@nestjs/config';
import { UpdateEventDto } from './dto/update-event.dto';
import { GetEventByDateDto } from './dto/get-event-by-date.dto';

@Injectable()
export class EventsService {
  private readonly logger = new Logger('EventsService');

  constructor(
    private configService: ConfigService,
    private readonly stateEventService: StateEventService,
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
  ) {}

  async createEvent(createEventDto: CreateEventDto) {
    try {
      const stateNewEvent = +this.configService.get('stateNewEvent');
      const createEvent = this.eventsRepository.create(createEventDto);
      const saveEvent = await this.eventsRepository.save(createEvent);

      await this.stateEventService.createStateEventChange({
        idEvent: saveEvent.idEvent,
        idStateEvent: stateNewEvent,
      });

      const findNewEvent = await this.eventsRepository.findOne({
        where: { idEvent: saveEvent.idEvent },
        relations: {
          stateEventChange: true,
          municipality: {
            department: true,
          },
        },
      });

      return {
        event: findNewEvent,
        message: 'Evento creado correctamente',
        statusCode: 201,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async updateEvent(
    idEvent: string,
    updateEventDto: UpdateEventDto,
    forceStateChange = false,
  ) {
    try {
      const findEventToEdit = await this.eventsRepository.findOneBy({
        idEvent,
      });
      if (!findEventToEdit) {
        throw new HttpException(
          'No se pudo encontrar el evento',
          HttpStatus.NOT_FOUND,
        );
      }
      if (
        findEventToEdit.idStateEvent !== updateEventDto.idStateEvent ||
        forceStateChange
      ) {
        await this.stateEventService.createStateEventChange({
          idEvent,
          idStateEvent: updateEventDto.idStateEvent,
        });
      }

      const newDataForEvent = {
        ...findEventToEdit,
        ...updateEventDto,
      };

      await this.eventsRepository.save(newDataForEvent);
      return newDataForEvent;
    } catch (error) {
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getEventsByDateRange(getEventsByDate: GetEventByDateRangeDto) {
    try {
      const { endDate, startDate } = getEventsByDate;
      const start = moment(startDate).startOf('day').toDate();
      const end = moment(endDate).endOf('day').toDate();
      const events = await this.eventsRepository.find({
        where: {
          eventDate: Between(start, end),
        },
        order: {
          eventDate: 'ASC',
        },
        relations: {
          municipality: {
            department: true,
          },
          contractingClient: true,
          stateEventChange: {
            stateEvent: true,
          },
          eventAssignments: {
            medical: true,
            medicalAssistant: true,
            driver: true,
            vehicle: true,
          },
          currentEventState: true,
          eventSignatures: true,
        },
      });
      return {
        events: events,
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getEventsByDate(getEventByDateDto: GetEventByDateDto) {
    try {
      const { eventDate } = getEventByDateDto;
      return this.getEventsByDateRange({
        startDate: eventDate,
        endDate: eventDate,
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
