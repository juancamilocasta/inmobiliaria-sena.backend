import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VinculationType } from './entities/vinculation-type.entity';

@Injectable()
export class VinculationTypesService {
  private readonly logger = new Logger('VinculationTypesService');

  constructor(
    @InjectRepository(VinculationType)
    private readonly vinculationTypesRepository: Repository<VinculationType>,
  ) {}

  async getAllVinculationTypes(): Promise<VinculationType[]> {
    try {
      const vinculationTypes = await this.vinculationTypesRepository.find({
        where: {
          isActive: 1,
        },
      });

      if (vinculationTypes.length === 0) {
        throw new HttpException(
          'No hay tipos de vinculación',
          HttpStatus.NOT_FOUND,
        );
      }

      return vinculationTypes;
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
