import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalRecord } from './entities/medical-record.entity';
import { Repository } from 'typeorm';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { ConfigService } from '@nestjs/config';
import { MedicalServicesService } from 'src/medical-services/medical-services.service';

@Injectable()
export class MedicalRecordService {
  private readonly logger = new Logger('MedicalRecordService');
  constructor(
    private readonly configService: ConfigService,
    private readonly medicalServiceService: MedicalServicesService,
    @InjectRepository(MedicalRecord)
    private readonly medicalRecordRepository: Repository<MedicalRecord>,
  ) {}
  async updateMedicalRecord(
    idMedicalRecord: string,
    updateMedicalRecordDto: UpdateMedicalRecordDto,
  ) {
    try {
      const updateMedicalRecordData =
        await this.medicalRecordRepository.findOne({
          where: { idMedicalRecord },
        });
      if (!updateMedicalRecordData) {
        throw new HttpException(
          'No se pudo actualizar el registro médico',
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.medicalRecordRepository.save({
        ...updateMedicalRecordData,
        ...updateMedicalRecordDto,
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async createMedicalRecord(idMedicalService: string) {
    try {
      const createMedicalRecordData = this.medicalRecordRepository.create({
        idMedicalService,
      });
      await this.medicalRecordRepository.save(createMedicalRecordData);
      if (!createMedicalRecordData) {
        throw new HttpException(
          'No se pudo crear el registro médico',
          HttpStatus.BAD_REQUEST,
        );
      }

      return {
        medicalRecord: createMedicalRecordData,
        message: 'Registro médico creado con éxito',
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getMedicalRecordByIdMedicalService(idMedicalService: string) {
    try {
      let medicalRecord = await this.medicalRecordRepository.findOne({
        where: { idMedicalService: idMedicalService },
        relations: {
          municipalityResidencePatient: true,
          medicalService: {
            patient: true,
            assignment: true,
          },
        },
      });
      if (!medicalRecord) {
        const newMedicalRecord = await this.medicalRecordRepository.create({
          idMedicalService,
        });
        await this.medicalRecordRepository.save(newMedicalRecord);
        if (!newMedicalRecord) {
          throw new HttpException(
            'No se encontró la historia clínica',
            HttpStatus.NOT_FOUND,
          );
        }
        medicalRecord = newMedicalRecord;
      }
      return {
        medicalRecord,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
