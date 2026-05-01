import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigCompany } from './entities/config-company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConfigCompanyService {
  private readonly logger = new Logger('ConfigCompanyService');

  constructor(
    @InjectRepository(ConfigCompany)
    private readonly configCompanyRepository: Repository<ConfigCompany>,
  ) {}

  async getConfigCompany(): Promise<ConfigCompany> {
    try {
      const configCompany = await this.configCompanyRepository.findOne({
        where: { idConfigCompany: 1 },
      });

      if (!configCompany) {
        throw new HttpException(
          'No existen configuraciones de la empresa',
          HttpStatus.NOT_FOUND,
        );
      }

      return configCompany;
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
