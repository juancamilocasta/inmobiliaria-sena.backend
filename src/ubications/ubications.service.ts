import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateUbicationDto } from './dto/create-ubication.dto';
import { UpdateUbicationDto } from './dto/update-ubication.dto';
import { Repository } from 'typeorm';
import { Ubication } from './entities/ubication.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UbicationsService {
  private readonly logger = new Logger('UbicationsService');

  constructor(
    @InjectRepository(Ubication)
    private readonly ubicationRepository: Repository<Ubication>,
  ) { }

  async createUbication(createUbicationDto: CreateUbicationDto) {
    try {
      const createdUbication = this.ubicationRepository.create(createUbicationDto);
      if (!createdUbication) {
        throw new Error('Error al crear la ubicación. Por favor, inténtelo de nuevo más tarde');
      }
      await this.ubicationRepository.save(createdUbication);
      return {
        message: 'Ubicación creada con éxito',
        statusCode: HttpStatus.CREATED
      }
    } catch (error) {
      this.logger.error(`Error creating ubication: ${error.message}`);
      throw new Error(
        error.message ||
        'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
      );
    }
  }

  async getAllUbicationsActives() {
    try {
      const ubications = await this.ubicationRepository.find({ where: { active: 1 } });
      if (ubications.length === 0) {
        throw new HttpException(
          'No se encontraron ubicaciones. Por favor, inténtelo de nuevo más tarde',
          HttpStatus.NOT_FOUND
        )
      }
      return {
        ubications,
        statusCode: HttpStatus.OK
      };
    } catch (error) {
      this.logger.error(`Error fetching active ubications: ${error.message}`);
      throw new Error(
        error.message ||
        'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
      );
    }
  }
}
