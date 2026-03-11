import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Support } from './entities/supports.entity';
import { Repository } from 'typeorm';
import { CreateSupportDto } from './dto/create-support.dto';

@Injectable()
export class SupportsService {
  private readonly logger = new Logger('SupportsService');
  constructor(
    @InjectRepository(Support)
    private readonly supportsRepository: Repository<Support>,
  ) {}
  async createSupport(createSupportDto: CreateSupportDto) {
    try {
      const support = this.supportsRepository.create(createSupportDto);
      await this.supportsRepository.save(support);

      return {
        status: true,
        message: 'Soporte creado correctamente',
      };
    } catch (error) {
      this.logger.error(error);
      if (error.errno === 1062) {
        throw new HttpException('El soporte ya existe', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getSupport() {
    try {
      const findSupport = await this.supportsRepository.find();
      if (findSupport.length === 0) {
        throw new HttpException('No existen soportes', HttpStatus.NOT_FOUND);
      }

      return {
        support: findSupport,
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
