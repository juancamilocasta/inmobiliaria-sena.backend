import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Diagnosis } from './entities/diagnosis.entity';
import { Repository } from 'typeorm';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';

@Injectable()
export class DiagnosisService {
  private readonly logger = new Logger('DiagnosisService');
  constructor(
    @InjectRepository(Diagnosis)
    private readonly diagnosisRepository: Repository<Diagnosis>,
  ) {}
  async createDiagnosis(createDiagnosisDto: CreateDiagnosisDto) {
    try {
      const diagnosis = this.diagnosisRepository.create(createDiagnosisDto);
      await this.diagnosisRepository.save(diagnosis);
      return {
        message: 'Diagnóstico creado correctamente',
        statusCode: 201,
      };
    } catch (error) {
      this.logger.error(error);
      if (error.errno === 1062) {
        throw new HttpException(
          'El diagnostico ya existe',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getDiagnosis() {
    try {
      const getAllDiagnosis = await this.diagnosisRepository.find();
      if (getAllDiagnosis.length === 0) {
        throw new HttpException(
          'No existen diagnosticos',
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        diagnosis: getAllDiagnosis,
        statusCode: 200,
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
