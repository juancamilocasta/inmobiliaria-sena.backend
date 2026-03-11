import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Eps } from './entities/eps.entity';
import { Repository } from 'typeorm';
import { CreateEpsDto } from './dto/create-eps.dto';

@Injectable()
export class EpsService {
  private readonly logger = new Logger('EpsService');
  constructor(
    @InjectRepository(Eps) private readonly epsRepository: Repository<Eps>,
  ) {}

  async createEps(createEpsDto: CreateEpsDto) {
    try {
      const createEps = this.epsRepository.create(createEpsDto);
      await this.epsRepository.save(createEps);

      return {
        message: 'EPS Creada correctamente',
        statusCode: 201,
      };
    } catch (error) {
      this.logger.error(error);
      if (error.errno === 1062) {
        throw new HttpException('La EPS ya existe', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllEps() {
    try {
      const getAllEps = await this.epsRepository.find();
      if (getAllEps.length === 0) {
        throw new HttpException('No existen EPS', HttpStatus.NOT_FOUND);
      }
      return {
        eps: getAllEps,
        statusCode: 200,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
