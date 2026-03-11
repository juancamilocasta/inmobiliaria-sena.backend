import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientType } from './entities/client-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientTypesService {
  private readonly logger = new Logger('ClientTypesService');
  constructor(
    @InjectRepository(ClientType)
    private readonly clientTypesRepository: Repository<ClientType>,
  ) {}
  async getAllClientTypes(): Promise<ClientType[]> {
    try {
      const response = await this.clientTypesRepository.find({
        where: { active: true },
      });

      if (response.length === 0) {
        throw new HttpException(
          'No existen tipos de clientes',
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
