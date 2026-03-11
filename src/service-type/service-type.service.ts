import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceType } from './entities/service-type.entity';
import { Repository } from 'typeorm';
import { CreateServiceTypeDto } from './dto/create-service-type.dto';

@Injectable()
export class ServiceTypeService {
  private readonly logger = new Logger('ServiceTypeService');
  constructor(
    @InjectRepository(ServiceType)
    private readonly serviceTypeRepository: Repository<ServiceType>,
  ) {}

  async createServiceType(createServiceTypeDto: CreateServiceTypeDto) {
    try {
      const serviceType =
        this.serviceTypeRepository.create(createServiceTypeDto);
      await this.serviceTypeRepository.save(serviceType);

      return {
        status: true,
        message: 'Servicio creado correctamente',
      };
    } catch (error) {
      this.logger.error(error);
      if (error.errno === 1062) {
        throw new HttpException(
          'El tipo de servicio ya existe',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getServiceType() {
    try {
      const findServiceType = await this.serviceTypeRepository.find();
      if (findServiceType.length === 0) {
        throw new HttpException(
          'No existen tipos de servicio',
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        serviceType: findServiceType,
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
