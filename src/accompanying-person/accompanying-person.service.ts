import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateAccompanyingPersonDto } from './dto/create-accompanying-person.dto';
import { UpdateAccompanyingPersonDto } from './dto/update-accompanying-person.dto';
import { AccompanyingPerson } from './entities/accompanying-person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class AccompanyingPersonService {
  private readonly logger = new Logger('AccompanyingPersonService');
  constructor(
    @InjectRepository(AccompanyingPerson)
    private readonly accompanyingPersonRepository: Repository<AccompanyingPerson>,
  ) {}
  async createAccompanyingPerson(
    createAccompanyingPersonDto: CreateAccompanyingPersonDto,
  ) {
    try {
      const responseAccompanyingPerson =
        this.accompanyingPersonRepository.create(createAccompanyingPersonDto);
      const savedAccompanyingPerson =
        await this.accompanyingPersonRepository.save(
          responseAccompanyingPerson,
        );

      if (!savedAccompanyingPerson) {
        throw new HttpException(
          'No se pudo crear el acompañante, por favor inténtelo de nuevo',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return savedAccompanyingPerson;
    } catch (error) {
      if (error.errno === 1062) {
        throw new HttpException(
          'ya existe un acompañante con el mismo documento de identidad',
          HttpStatus.CONFLICT,
        );
      }
      this.logger.error(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateAccompanyingPerson(
    updateAccompanyingPersonDto: UpdateAccompanyingPersonDto,
  ) {
    try {
      const { idAccompanyingPerson } = updateAccompanyingPersonDto;

      const findAccompanyingPerson =
        await this.accompanyingPersonRepository.findOneBy({
          idAccompanyingPerson,
        });

      if (!findAccompanyingPerson) {
        throw new HttpException(
          'No se encontró el acompañante',
          HttpStatus.NOT_FOUND,
        );
      }

      const newAccompanyingPersonData = {
        ...findAccompanyingPerson,
        ...updateAccompanyingPersonDto,
        updatedDate: moment().format('YYYY-MM-DD'),
      };

      await this.accompanyingPersonRepository.save(newAccompanyingPersonData);

      return newAccompanyingPersonData;
    } catch (error) {
      this.logger.error(error);
      if (error.errno === 1062) {
        throw new HttpException(
          'Ya existe un acompañante para ese traslado',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        error.message || 'Error al crear el acompañante',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
