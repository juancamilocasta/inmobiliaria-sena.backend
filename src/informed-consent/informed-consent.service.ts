import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateInformedConsentDto } from './dto/create-informed-consent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InformedConsent } from './entities/informed-consent.entity';
import { Repository } from 'typeorm';
import { UpdateInformedConsentDto } from './dto/update-informed-consent.dto';

@Injectable()
export class InformedConsentService {
  private readonly logger = new Logger('InformedConsentService');
  constructor(
    @InjectRepository(InformedConsent)
    private readonly informedConsentRepository: Repository<InformedConsent>,
  ) {}
  async createInformedConsent(
    createInformedConsentDto: CreateInformedConsentDto,
  ) {
    try {
      const informedConsent = this.informedConsentRepository.create(
        createInformedConsentDto,
      );

      const savedInformedConsent = await this.informedConsentRepository.save(
        informedConsent,
      );

      if (!savedInformedConsent) {
        throw new HttpException(
          'No se pudo crear el consentimiento informado',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return {
        statusCode: 201,
        message: 'Consentimiento informado creado correctamente',
        informedConsent: savedInformedConsent,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateInformedConsent(
    idInformedConsent: number,
    updateInformedConsentDto: UpdateInformedConsentDto,
  ) {
    try {
      const findInformedConsent = await this.informedConsentRepository.findOne({
        where: { idInformedConsent },
      });

      if (!findInformedConsent) {
        throw new HttpException(
          'No se encontró el consentimiento informado',
          HttpStatus.NOT_FOUND,
        );
      }

      const paramsUpdate = {
        ...findInformedConsent,
        ...updateInformedConsentDto,
      };

      const savedInformedConsent = await this.informedConsentRepository.save(
        paramsUpdate,
      );

      if (!savedInformedConsent) {
        throw new HttpException(
          'No se pudo actualizar el consentimiento informado',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return {
        statusCode: 201,
        message: 'Consentimiento informado actualizado correctamente',
        informedConsent: savedInformedConsent,
      };
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
