import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateConcernPatientInformedConsentDto } from './dto/create-concerns-patient-informed-consent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConcernsPatientInformedConsent } from './entities/concerns-patient-informed-consent.entity';

@Injectable()
export class ConcernsPatientInformedConsentService {
  private readonly logger = new Logger('ConcernsPatientInformedConsentService');
  constructor(
    @InjectRepository(ConcernsPatientInformedConsent)
    private readonly concernsPatientInformedConsentRepository: Repository<ConcernsPatientInformedConsent>,
  ) {}
  async createQuestionsPatientInformedConsent(
    createConcernPatientInformedConsentDto: CreateConcernPatientInformedConsentDto,
  ) {
    try {
      let createResponse = null;
      const { concerns, idInformedConsent, valueConcernOption } =
        createConcernPatientInformedConsentDto;

      if (concerns && concerns.length > 0) {
        createResponse = concerns?.map((concern) => {
          return this.concernsPatientInformedConsentRepository.create({
            text: concern.text,
            idInformedConsent,
            valueConcernOption,
          });
        });
      } else {
        createResponse = [
          this.concernsPatientInformedConsentRepository.create({
            idInformedConsent,
            valueConcernOption,
            text: null,
          }),
        ];
      }

      const savedResponse =
        await this.concernsPatientInformedConsentRepository.save(
          createResponse,
        );

      if (!savedResponse) {
        throw new HttpException(
          'Error al crear la información',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return {
        statusCode: 201,
        message: 'Información guardada correctamente',
        concernsPatientInformedConsent: savedResponse,
      };
    } catch (error) {
      console.log(error);

      this.logger.error(error);
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
