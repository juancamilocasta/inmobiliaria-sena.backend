import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Municipality } from './entities/municipality.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MunicipalityService {
  logger = new Logger('MunicipalityService');
  constructor(
    @InjectRepository(Municipality)
    private municipalityRepository: Repository<Municipality>,
  ) {}

  async getMunicipalities() {
    try {
      const municipalities = await this.municipalityRepository.find({
        relations: { department: true },
      });
      if (municipalities.length === 0) {
        throw new HttpException('No existen municipios', HttpStatus.NOT_FOUND);
      }
      return {
        municipalities,
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
