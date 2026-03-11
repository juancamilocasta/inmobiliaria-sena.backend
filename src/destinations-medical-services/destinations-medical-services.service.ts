import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateDestinationsMedicalServiceDto } from './dto/create-destinations-medical-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DestinationsMedicalService } from './entities/destinations-medical-service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DestinationsMedicalServicesService {
  private readonly logger = new Logger('DestinationsMedicalServicesService');
  constructor(
    @InjectRepository(DestinationsMedicalService)
    private readonly destinationsMedicalServiceRepository: Repository<DestinationsMedicalService>,
  ) {}
  async createDestinationMedicalService(
    createDestinationMedicalServiceDto: CreateDestinationsMedicalServiceDto,
  ) {
    try {
      const destinationMedicalService =
        this.destinationsMedicalServiceRepository.create(
          createDestinationMedicalServiceDto,
        );
      if (!destinationMedicalService) {
        throw new HttpException(
          'No se pudo crear el destino del servicio médico',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      await this.destinationsMedicalServiceRepository.save(
        destinationMedicalService,
      );
      return {
        message: 'Se creo el destino del servicio médico correctamente',
        statusCode: 201,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message ||
          'Error en el servidor, por favor, intentelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
