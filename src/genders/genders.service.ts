import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gender } from './entities/gender.entity';

@Injectable()
export class GendersService {
  private readonly logger = new Logger('GendersService');

  constructor(
    @InjectRepository(Gender)
    private readonly genderRepository: Repository<Gender>,
  ) {}

  async getAllGenders() {
    try {
      const genders = await this.genderRepository.find({
        where: {
          active: 1,
        },
      });

      if (genders.length === 0) {
        throw new HttpException('No existen géneros', HttpStatus.NOT_FOUND);
      }

      return genders;
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
