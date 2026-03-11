import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StateMedicalService } from './entities/state-medical-services.entity';
import { Repository } from 'typeorm';
import { MedicalService } from 'src/medical-services/entities/medical-services.entity';
import { StateMedicalServicesChange } from './entities/medical-services-state-change.entity';
import { CreateChangeStateChangeDto } from './dto/create-change-state-change.dto';
import { CreateStateMedicalServicesDto } from './dto/create-state-change.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StateMedicalServicesService {
  private readonly logger = new Logger('StateMedicalServicesService');
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(StateMedicalService)
    private readonly stateMedicalServicesRepository: Repository<StateMedicalService>,
    @InjectRepository(MedicalService)
    private readonly medicalServicesRepository: Repository<MedicalService>,
    @InjectRepository(StateMedicalServicesChange)
    private readonly stateMedicalServicesChangesRepository: Repository<StateMedicalServicesChange>,
  ) {}

  async createStateMedicalServicesChange(
    createChangeStateChangeDto: CreateChangeStateChangeDto,
  ) {
    try {
      const { idStateMedicalService, idMedicalService } =
        createChangeStateChangeDto;

      const stateMedicalService =
        await this.stateMedicalServicesRepository.findOneBy({
          idStateMedicalService,
        });
      const medicalService = await this.medicalServicesRepository.findOneBy({
        idMedicalService,
      });
      const stateChange = new StateMedicalServicesChange();
      stateChange.medicalService = medicalService;
      stateChange.state = stateMedicalService;
      const stateArrivedPatientLocation = this.configService.get<number>(
        'stateArrivedPatientLocation',
      );
      const stateArrivedDestinationOne = this.configService.get<number>(
        'stateArrivedDestinationOne',
      );
      const stateArrivedDestinationTwo = this.configService.get<number>(
        'stateArrivedDestinationTwo',
      );

      if (
        idStateMedicalService === stateArrivedDestinationOne ||
        idStateMedicalService === stateArrivedDestinationTwo ||
        idStateMedicalService === stateArrivedPatientLocation
      ) {
        const mileageRequiredIdsWithouFormat = this.configService.get<string>(
          'statesMileageRequired',
        );
        const mileageRequiredIdsFormat =
          mileageRequiredIdsWithouFormat.split(',');
        const mileageRequiredIds = mileageRequiredIdsFormat.map((id) => +id);
        const mileageRequiredIdBefore = mileageRequiredIds.find(
          (id) => id < idStateMedicalService,
        );

        const transferDurinAfterState =
          await this.stateMedicalServicesChangesRepository.findOne({
            where: {
              idMedicalService: idMedicalService,
              idStateMedicalService: mileageRequiredIdBefore,
            },
            relations: {
              transfersDuringService: true,
            },
          });

        if (
          +transferDurinAfterState.transfersDuringService.mileage >=
          +createChangeStateChangeDto.mileage
        ) {
          throw new HttpException(
            'El kilometraje debe ser mayor al anterior',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      await this.stateMedicalServicesChangesRepository.save(stateChange);
      if (
        createChangeStateChangeDto?.fromMedicalRecord &&
        createChangeStateChangeDto?.fromMedicalRecord === 1
      ) {
        return {
          stateChange,
          message: 'Estado actualizado correctamente',
          statusCode: 201,
        };
      }
      return {
        message: 'Estado actualizado correctamente',
        statusCode: 201,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async createChangeStateChange(
    CreateStateMedicalServicesDto: CreateStateMedicalServicesDto,
  ) {
    try {
      const createStateMedical =
        await this.stateMedicalServicesRepository.create(
          CreateStateMedicalServicesDto,
        );
      await this.stateMedicalServicesRepository.save(createStateMedical);

      return {
        message: 'Estado creado correctamente',
        statusCode: 201,
      };
    } catch (error) {
      this.logger.error(error);
      if (error.errno === 1062) {
        throw new HttpException('El estado ya existe', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getStateChange() {
    try {
      const findStateChange = await this.stateMedicalServicesRepository.find({
        where: { isActive: 1 },
      });
      if (findStateChange.length === 0) {
        throw new HttpException('No existen estados', HttpStatus.NOT_FOUND);
      }
      return {
        stateChange: findStateChange,
        statusCode: 200,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
