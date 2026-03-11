import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PopulationZone } from './entities/population-zone.entity';

@Injectable()
export class PopulationZonesService {
  private readonly logger = new Logger('PopulationZonesService');

  constructor(
    @InjectRepository(PopulationZone)
    private readonly populationZoneRepository: Repository<PopulationZone>,
  ) {}

  async getAllPopulationZones() {
    try {
      const populationZones = await this.populationZoneRepository.find({
        where: {
          active: 1,
        },
      });

      if (populationZones.length === 0) {
        throw new HttpException('No existen géneros', HttpStatus.NOT_FOUND);
      }

      return populationZones;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
