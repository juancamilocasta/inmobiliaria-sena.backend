import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { GetDataPatientByIdDto } from './dto/get-data-patient-by-id.dto';
import { DocumentType } from 'src/document-types/entities/document-type.entity';

@Injectable()
export class PatientService {
  private readonly logger = new Logger('PatientService');
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(DocumentType)
    private readonly documentTypeRepository: Repository<DocumentType>,
  ) {}

  async createPatient(createPatientDto: CreatePatientDto) {
    try {
      const createPatientData = this.patientRepository.create(createPatientDto);
      await this.patientRepository.save(createPatientData);
      return await this.patientRepository.findOne({
        where: { idPatient: createPatientData.idPatient },
        relations: { documentType: true, gender: true },
      });
    } catch (error) {
      if (error.errno === 1062) {
        throw new HttpException('El paciente ya existe', HttpStatus.CONFLICT);
      }
      this.logger.error(error);
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updatePatient(idPatient: number, updatePatientDto: UpdatePatientDto) {
    try {
      const findPatient = await this.patientRepository.findOneBy({
        idPatient,
      });
      if (!findPatient) {
        throw new HttpException('El paciente no existe', HttpStatus.NOT_FOUND);
      }
      const newDataPatient = { ...findPatient, ...updatePatientDto };
      await this.patientRepository.save(newDataPatient);
      return await this.patientRepository.findOne({
        where: {
          idPatient,
        },
        relations: { documentType: true, gender: true },
      });
    } catch (error) {
      if (error.errno === 1062) {
        throw new HttpException('El paciente ya existe', HttpStatus.CONFLICT);
      }
      this.logger.error(error);
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getPatient() {
    try {
      const findPatient = await this.patientRepository.find({
        relations: {
          documentType: true,
        },
      });
      if (findPatient.length === 0) {
        throw new HttpException('No existen pacientes', HttpStatus.NOT_FOUND);
      }
      return {
        patient: findPatient,
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
  async getDataPatientById(getDataPatientByIdDto: GetDataPatientByIdDto) {
    try {
      const { idPatient } = getDataPatientByIdDto;
      const findDataPatient = await this.patientRepository.find({
        where: { idPatient },
        relations: {
          documentType: true,
          medicalServices: {
            stateChange: {
              state: true,
            },
          },
        },
      });

      if (findDataPatient.length === 0) {
        throw new HttpException(
          'No existen datos del paciente',
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        dataPatient: findDataPatient,
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

  async getDataPatientByDocument(document: string) {
    try {
      const patient = await this.patientRepository.findOne({
        where: { document },
        relations: {
          documentType: true,
          gender: true,
        },
      });

      if (!patient) {
        throw new HttpException(
          'No existen datos del paciente',
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        patient,
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
