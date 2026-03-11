import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MaritalStatus } from './entities/marital-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MaritalStatusService {
  private readonly logger = new Logger('MaritalStatusService');
  constructor(
    @InjectRepository(MaritalStatus)
    private readonly maritalStatusRepository: Repository<MaritalStatus>,
  ) {}

  async findAllMaritalStatus() {
    try {
      const maritalStatus = await this.maritalStatusRepository.find({
        where: { activeMaritalStatus: 1 },
      });
      if (maritalStatus.length === 0) {
        throw new HttpException(
          'No se encontraron estados civiles',
          HttpStatus.NOT_FOUND,
        );
      }
      return maritalStatus;
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
