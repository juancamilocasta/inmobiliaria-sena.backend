import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContractingClientsService } from './entities/contracting-clients-service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContractingClientsServicesService {
  private readonly logger = new Logger('ContractingClientsServicesService');
  constructor(
    @InjectRepository(ContractingClientsService)
    private readonly contractingClientServiceRepository: Repository<ContractingClientsService>,
  ) {}
  async getAllContractingClientsService() {
    try {
      const responseContractingClientServices =
        await this.contractingClientServiceRepository.find({
          relations: {
            contractingClient: true,
            serviceType: true,
          },
        });
      if (responseContractingClientServices.length === 0) {
        throw new HttpException(
          'No se encontraron registros',
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        contractingClientServices: responseContractingClientServices,
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
