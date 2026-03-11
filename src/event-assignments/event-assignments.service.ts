import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventAssignmentsDto } from './dto/create-event-assignments.dto';
import { Repository } from 'typeorm';
import { EventAssignment } from './entities/event-assignment.entity';
import { EventsService } from 'src/events/events.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EventAssignmentsService {
  private readonly logger = new Logger('EventAssignmentsService');
  constructor(
    @InjectRepository(EventAssignment)
    private readonly eventAssignmentsRepository: Repository<EventAssignment>,
    private readonly eventsService: EventsService,
    private readonly configService: ConfigService,
  ) {}
  async create(createEventAssignmentsDto: CreateEventAssignmentsDto) {
    try {
      const createEventAssignment =
        await this.eventAssignmentsRepository.create(createEventAssignmentsDto);
      await this.eventAssignmentsRepository.save(createEventAssignment);
      if (!createEventAssignment) {
        throw new HttpException(
          'No se pudo asignar el evento',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      await this.eventsService.updateEvent(createEventAssignmentsDto.idEvent, {
        idStateEvent: this.configService.get<number>('stateAssignedEvent'),
      });
      return {
        message: 'Asignación creada correctamente',
        statusCode: 201,
      };
    } catch (error) {
      this.logger.error(error);
      if (error.errno === 1062) {
        throw new HttpException('La asignación ya existe', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async update(
    idEventAssignment: string,
    updateEventAssignmentsDto: CreateEventAssignmentsDto,
  ) {
    try {
      const findAssignmentToEdit =
        await this.eventAssignmentsRepository.findOneBy({
          idEventAssignment,
        });
      if (!findAssignmentToEdit) {
        throw new HttpException(
          'La asignación no existe',
          HttpStatus.NOT_FOUND,
        );
      }
      const newDataForAssignment = {
        ...findAssignmentToEdit,
        ...updateEventAssignmentsDto,
      };
      await this.eventAssignmentsRepository.save(newDataForAssignment);
      // TODO: debo cambiar el estado del evento solo si esta en estado asignado, de lo contrario no debo modificar
      await this.eventsService.updateEvent(
        updateEventAssignmentsDto.idEvent,
        {
          idStateEvent: this.configService.get<number>('stateReassignedEvent'),
        },
        true,
      );
      return {
        message: 'Asignación actualizada correctamente',
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
}
