import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreatePatientEventRegisterDto } from './dto/create-patient-event-register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientEventRegister } from './entities/patient-event-register.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatientEventRegisterService {
  private readonly logger = new Logger('PatientEventRegisterService');

  constructor(
    @InjectRepository(PatientEventRegister)
    private readonly patientEventRegisterRepository: Repository<PatientEventRegister>,
  ) {}
  async createPatientEventRegister(
    createPatientEventRegisterDto: CreatePatientEventRegisterDto,
  ) {
    try {
      const patientEventRegister = this.patientEventRegisterRepository.create(
        createPatientEventRegisterDto,
      );
      await this.patientEventRegisterRepository.save(patientEventRegister);
      if (!patientEventRegister) {
        throw new HttpException(
          'No se pudo registrar al paciente correctamente. Por favor, verifique e intente nuevamente.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return {
        patientEventRegister,
        message: 'Paciente registrado con éxito',
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message ||
          'Hubo un error en el servidor. Por favor, intente de nuevo más tarde.',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
