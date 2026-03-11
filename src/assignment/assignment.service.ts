import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Repository } from 'typeorm';
import { ApiBasicResponse } from 'src/interfaces/response-general-requests.model';
import { GetAssignmentResponse } from './interfaces/assignment.model';
import { ConfigService } from '@nestjs/config';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { MedicalServicesService } from 'src/medical-services/medical-services.service';

@Injectable()
export class AssignmentService {
  private readonly logger = new Logger('AssignmentService');
  constructor(
    private readonly medicalServicesService: MedicalServicesService,
    private readonly configService: ConfigService,
    @InjectRepository(Assignment)
    private readonly assignmentRepository: Repository<Assignment>,
  ) {}

  async createAssignment(
    createAssignmentDto: CreateAssignmentDto,
  ): Promise<ApiBasicResponse> {
    try {
      const {
        idDriver,
        idMedical,
        idMedicalAssistant,
        idVehicle,
        dateProgrammed,
      } = createAssignmentDto;
      await this.validateCrewDateAndTime(
        { idDriver, idMedical, idMedicalAssistant, idVehicle },
        dateProgrammed,
      );

      const assignment = this.assignmentRepository.create(createAssignmentDto);
      await this.assignmentRepository.save(assignment);
      if (!assignment) {
        throw new HttpException(
          'No se pudo asignar el traslado',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      await this.medicalServicesService.updateMedicalServices(
        createAssignmentDto.idMedicalService,
        {
          idStateMedicalService:
            this.configService.get<number>('stateAssigned'),
        },
      );
      return {
        message: 'Se asignó el traslado correctamente',
        statusCode: 201,
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

  async getAssignment(): Promise<GetAssignmentResponse> {
    try {
      const assignment = await this.assignmentRepository.find({
        relations: {
          vehicle: true,
        },
      });
      if (assignment.length === 0) {
        throw new HttpException(
          'No se encontraron asignaciones',
          HttpStatus.NOT_FOUND,
        );
      }
      return { assignment, statusCode: 200 };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateAssignment(
    idAssignment: string,
    updateAssignmentDto: UpdateAssignmentDto,
  ) {
    try {
      const { idDriver, idMedical, idMedicalAssistant, idVehicle } =
        updateAssignmentDto;
      const findAssignmentToEdit = await this.assignmentRepository.findOne({
        where: { idAssignment },
        relations: {
          medicalService: true,
        },
      });

      if (!findAssignmentToEdit) {
        throw new HttpException(
          'Asignacion no encontrada',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.validateCrewDateAndTime(
        { idDriver, idMedical, idMedicalAssistant, idVehicle },
        findAssignmentToEdit.medicalService.dateProgrammed,
        idAssignment,
      );

      const newDataForAssignment = {
        ...findAssignmentToEdit,
        ...updateAssignmentDto,
      };

      await this.assignmentRepository.save(newDataForAssignment);
      // TODO: debo cambiar el estado del servicio medico solo si esta en estado asignado, de lo contrario no debo modificar
      await this.medicalServicesService.updateMedicalServices(
        updateAssignmentDto.idMedicalService,
        {
          idStateMedicalService:
            this.configService.get<number>('stateReassigned'),
        },
        true,
      );

      return {
        message: 'Servicio actualizado con éxito',
        medicalService: newDataForAssignment,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateCrewDateAndTime(crew, dateProgrammed, idAssignment = null) {
    try {
      const { idDriver, idMedical, idMedicalAssistant, idVehicle } = crew;
      const findAssignmentInSameDay = await this.assignmentRepository
        .createQueryBuilder('assignment')
        .leftJoinAndSelect('assignment.medicalService', 'medicalService')
        .andWhere(
          idAssignment ? 'assignment.idAssignment != :idAssignment' : 'true',
          { idAssignment },
        )
        .andWhere('medicalService.dateProgrammed = :dateProgrammed', {
          dateProgrammed,
        })
        .andWhere(
          '(assignment.idDriver = :idDriver OR assignment.idVehicle = :idVehicle OR assignment.idMedicalAssistant = :idMedicalAssistant OR assignment.idMedical = :idMedical)',
          { idDriver, idVehicle, idMedicalAssistant, idMedical },
        )
        .getMany();

      if (findAssignmentInSameDay.length > 0) {
        throw new HttpException(
          'Ya existe un servicio asignado para esa fecha y hora con uno o mas miembros de la tripulación del servicio',
          HttpStatus.CONFLICT,
        );
      }
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
