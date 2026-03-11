import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProcedureRiskInformedConsent } from './entities/procedure-risks-informed-consent.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProcedureRisksInformedConsentDto } from './dto/create-procedure-risks-informed-consent.dto';

@Injectable()
export class ProcedureRisksInformedConsentService {
  private readonly logger = new Logger('ProcedureRisksInformedConsentService');
  constructor(
    @InjectRepository(ProcedureRiskInformedConsent)
    private readonly procedureRiskInformedConsent: Repository<ProcedureRiskInformedConsent>,
  ) {}
  async create(
    createProcedureRisksInformedConsentDto: CreateProcedureRisksInformedConsentDto,
  ) {
    try {
      const createProcedureRiskResponse =
        await this.procedureRiskInformedConsent.create(
          createProcedureRisksInformedConsentDto,
        );

      const savedProcedureRiskResponse =
        await this.procedureRiskInformedConsent.save(
          createProcedureRiskResponse,
        );

      if (!savedProcedureRiskResponse) {
        throw new HttpException(
          'No se pudo crear la información, por favor inténtelo de nuevo',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return {
        statusCode: 201,
        message: 'Información creada correctamente',
        procedureRiskInformedConsent: savedProcedureRiskResponse,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo.mas tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
