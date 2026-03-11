import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsulationType } from './entities/insulation-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InsulationTypesService {
  private readonly logger = new Logger('InsulationTypesService');
  constructor(
    @InjectRepository(InsulationType)
    private readonly insulationTypesRepository: Repository<InsulationType>,
  ) {}
  async findAll() {
    try {
      const unsulationTypes = await this.insulationTypesRepository.find();
      if (unsulationTypes.length === 0) {
        throw new HttpException(
          'No existen tipos de aislamiento',
          HttpStatus.NOT_FOUND,
        );
      }
      return unsulationTypes;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
