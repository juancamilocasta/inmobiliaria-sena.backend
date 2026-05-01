import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreatePropiertyStateDto } from './dto/create-propierty-state.dto';
import { UpdatePropiertyStateDto } from './dto/update-propierty-state.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PropiertyState } from './entities/propierty-state.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PropiertyStatesService {
  private readonly logger = new Logger('PropiertyStatesService');

  constructor(
    @InjectRepository(PropiertyState)
    private propiertyStateRepository: Repository<PropiertyState>,
  ) { }

  async createState(createPropiertyStateDto: CreatePropiertyStateDto) {
    try {
      const createdState = this.propiertyStateRepository.create(createPropiertyStateDto);
      if (!createdState) {
        throw new HttpException(
          'Error al crear el estado de la propiedad. Por favor, inténtelo de nuevo más tarde',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      await this.propiertyStateRepository.save(createdState);
      return {
        message: 'Estado de propiedad creado con éxito',
        statusCode: HttpStatus.CREATED
      }
    } catch (error) {
      this.logger.error(`Error creating state: ${error.message}`);
      throw new HttpException(
        error.message ||
        'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllStatesActives() {

    try {
      const states = await this.propiertyStateRepository.find({ where: { active: 1 } });
      if (states.length === 0) {
        throw new HttpException(
          'No se encontraron estados de propiedad activos. Por favor, inténtelo de nuevo más tarde',
          HttpStatus.NOT_FOUND
        )
      }
      return {
        states,
        statusCode: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error searching states: ${error.message}`);
      throw new HttpException(
        error.message ||
        'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  
}
