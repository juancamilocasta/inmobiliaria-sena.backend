import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreatePhysicalExaminationDto } from './dto/create-physical-examination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PhysicalExamination } from './entities/physical-examination.entity';
import { Repository } from 'typeorm';
import { UpdatePhysicalExaminationDto } from './dto/update-physical-examination.dto';

@Injectable()
export class PhysicalExaminationService {
  private readonly logger = new Logger('PhysicalExaminationService');
  constructor(
    @InjectRepository(PhysicalExamination)
    private readonly physicalExaminationRepository: Repository<PhysicalExamination>,
  ) {}
  async createPhysicalExamination(
    createPhysicalExaminationDto: CreatePhysicalExaminationDto,
  ) {
    try {
      const createPhysicalExaminationData =
        this.physicalExaminationRepository.create(createPhysicalExaminationDto);
      await this.physicalExaminationRepository.save(
        createPhysicalExaminationData,
      );
      if (!createPhysicalExaminationData) {
        throw new HttpException(
          'No se pudo crear el examen físico',
          HttpStatus.BAD_REQUEST,
        );
      }

      return {
        physicalExamination: createPhysicalExaminationData,
        message: 'Examen físico creado con éxito',
        statusCode: HttpStatus.CREATED,
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
  async getPhysicalExaminationByIdMedicalRecord(idMedicalRecord: string) {
    try {
      const physicalExamination = await this.physicalExaminationRepository.find(
        {
          where: { idMedicalRecord },
          relations: {
            medicalRecord: true,
          },
        },
      );
      if (!physicalExamination) {
        throw new HttpException(
          'Examen físico no encontrado',
          HttpStatus.NOT_FOUND,
        );
      }
      return { physicalExamination, statusCode: HttpStatus.OK };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updatePhysicalExamination(
    idPhysicalExamination: string,
    updatePhysicalExaminationDto: UpdatePhysicalExaminationDto,
  ) {
    try {
      const physicalExamination =
        await this.physicalExaminationRepository.findOne({
          where: {
            idPhysicalExamination,
          },
        });
      if (!physicalExamination) {
        throw new HttpException(
          'No se encontró el exámen médico',
          HttpStatus.NOT_FOUND,
        );
      }
      await this.physicalExaminationRepository.save({
        ...physicalExamination,
        ...updatePhysicalExaminationDto,
      });
      return {
        message: 'Exámen físico actualizado con éxito',
        statusCode: HttpStatus.OK,
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
  async deletePhysicalExamination(idPhysicalExamination: string) {
    try {
      const physicalExamination =
        await this.physicalExaminationRepository.delete(idPhysicalExamination);
      if (physicalExamination.affected === 0) {
        throw new HttpException(
          'No se pudo eliminar el examen físico',
          HttpStatus.BAD_REQUEST,
        );
      }
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
