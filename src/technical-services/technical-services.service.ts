import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TechnicalService } from './entities/technical-service.entity';
import { Repository } from 'typeorm';
import { CreateTechnicalServicesDto } from './dto/create-technical-services.dto';

@Injectable()
export class TechnicalServicesService {
  private readonly logger = new Logger('TechnicalServicesService');
  constructor(
    @InjectRepository(TechnicalService)
    private readonly technicalServicesRepository: Repository<TechnicalService>,
  ) {}

  async createTechnicalService(
    createTechnicalServicesDto: CreateTechnicalServicesDto,
  ) {
    // TODO: falta envio de correo a futuro con la informacion del servicio técnico
    try {
      const technicalService = this.technicalServicesRepository.create(
        createTechnicalServicesDto,
      );
      await this.technicalServicesRepository.save(technicalService);

      return {
        message: 'Servicio técnico creado correctamente',
        statusCode: 201,
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
