import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateTransfersDuringServiceDto } from './dto/create-transfers-during-service.dto';
import { UpdateTransfersDuringServiceDto } from './dto/update-transfers-during-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TransfersDuringService } from './entities/transfers-during-service.entity';
import { Repository } from 'typeorm';
import { MedicalServicesService } from 'src/medical-services/medical-services.service';

@Injectable()
export class TransfersDuringServiceService {
  private readonly logger = new Logger('TransfersDuringServiceService');
  constructor(
    private readonly medicalServiceService: MedicalServicesService,
    @InjectRepository(TransfersDuringService)
    private readonly transferDuringServiceRepository: Repository<TransfersDuringService>,
  ) {}
  async createTransferDuringService(
    idMedicalService: string,
    params: CreateTransfersDuringServiceDto,
  ) {
    try {
      const resposeUpdateMedicalService =
        await this.medicalServiceService.updateMedicalServices(
          idMedicalService,
          {
            idStateMedicalService: params.idStateMedicalService,
            fromMedicalRecord: 1,
            mileage: params.mileage,
          },
        );
      if (resposeUpdateMedicalService.statusCode !== 201) {
        throw new HttpException(
          resposeUpdateMedicalService.message || 'No se pudo cambiar el estado',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const { stateChange } = resposeUpdateMedicalService;

      const newTransferDuringService =
        await this.transferDuringServiceRepository.create({
          idStateMedicalServiceChanges:
            +stateChange.idStateMedicalServicesChanges,
          mileage: params.mileage,
        });
      if (!newTransferDuringService) {
        throw new HttpException(
          'No se pudo crear el traslado durante el servicio',
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.transferDuringServiceRepository.save(newTransferDuringService);
      return {
        stateChange: resposeUpdateMedicalService.stateChange,
        message: 'Traslado durante el servicio creado correctamente',
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateTransferDuringService(
    idTransferDuringService: number,
    params: UpdateTransfersDuringServiceDto,
  ) {
    try {
      const transferDuringService =
        await this.transferDuringServiceRepository.findOne({
          where: {
            idTransferDuringService,
          },
        });
      if (!transferDuringService) {
        throw new HttpException(
          'No se encontró el traslado',
          HttpStatus.NOT_FOUND,
        );
      }
      const updateTransferDuringService = {
        ...transferDuringService,
        ...params,
      };
      await this.transferDuringServiceRepository.save(
        updateTransferDuringService,
      );
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTransfersDuringService(idMedicalService) {
    try {
      const transfersDuringService =
        await this.transferDuringServiceRepository.find({
          where: idMedicalService,
          relations: {
            stateMedicalServicesChange: true,
          },
        });
      if (transfersDuringService.length === 0) {
        throw new HttpException(
          'No se encontraron transferencias durante el servicio',
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        transfersDuringService,
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
