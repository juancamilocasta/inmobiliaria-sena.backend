import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonType } from './entities/person-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonTypesService {
  private readonly logger = new Logger('PersonTypesService');
  constructor(
    @InjectRepository(PersonType)
    private readonly personTypesRepository: Repository<PersonType>,
  ) {}

  async getAllPersonTypes(): Promise<PersonType[]> {
    try {
      const response = await this.personTypesRepository.find({
        where: { active: true },
      });

      if (response.length === 0) {
        throw new HttpException(
          'No existen tipos de personas',
          HttpStatus.NOT_FOUND,
        );
      }

      return response;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
