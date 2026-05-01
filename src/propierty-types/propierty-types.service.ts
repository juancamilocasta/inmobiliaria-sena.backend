import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreatePropiertyTypeDto } from './dto/create-propierty-type.dto';
import { UpdatePropiertyTypeDto } from './dto/update-propierty-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PropiertyType } from './entities/propierty-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PropiertyTypesService {
  private readonly logger = new Logger('PropiertyTypesService');

  constructor(
    @InjectRepository(PropiertyType)
    private propiertyTypeRepository: Repository<PropiertyType>,
  ) { }

  async createPropiertyType(createPropiertyTypeDto: CreatePropiertyTypeDto) {
    try {
      const createdType = this.propiertyTypeRepository.create(createPropiertyTypeDto);
      if (!createdType) {
        throw new Error('Error al crear el tipo de propiedad. Por favor, inténtelo de nuevo más tarde');
      }
      await this.propiertyTypeRepository.save(createdType);
      return {
        message: 'Tipo de propiedad creado con éxito',
        statusCode: 201
      }
    } catch (error) {
      this.logger.error(`Error creating propierty type: ${error.message}`);
      throw new Error(
        error.message ||
        'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
      );
    }
  }

  async getAllPropiertyTypesActives() {
    try {
      const propiertyTypes = await this.propiertyTypeRepository.find({ where: { active: 1 } });
      if (propiertyTypes.length === 0) {
        throw new Error('No se encontraron tipos de propiedad activos. Por favor, inténtelo de nuevo más tarde');
      }
      return {
        types: propiertyTypes,
        statusCode: HttpStatus.OK
      }
    } catch (error) {
      this.logger.error(`Error fetching active propierty types: ${error.message}`);
      throw new Error(
        error.message ||
        'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
      );
    }
  }
}
