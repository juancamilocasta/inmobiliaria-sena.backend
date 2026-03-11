import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalService } from './entities/medical-services.entity';
import { Between, Repository } from 'typeorm';
import { CreateMedicalServicesDto } from './dto/create-medical-services.dto';
import { StateMedicalServicesService } from 'src/state-medical-services/state-medical-services.service';
import { GetMedicalServiceByDateRangeDto } from './dto/get-medical-service-by-date-range.dto';
import { Support } from 'src/supports/entities/supports.entity';
import { ConfigService } from '@nestjs/config';
import { UpdateMedicalServicesDto } from './dto/update-medical-services.entity';
import * as moment from 'moment';
import { InsulationType } from 'src/insulation-types/entities/insulation-type.entity';
import { GetMedicalServiceByDateDto } from './dto/get-medical-service-by-date.dto';
import { DestinationsMedicalServicesService } from 'src/destinations-medical-services/destinations-medical-services.service';
import { GetMedicalServicePaginatorDto } from './dto/get-medical-service-paginator.dto';
import { throwError } from 'rxjs';
import { pageToOffset } from 'src/utilities/pageToOffset';
@Injectable()
export class MedicalServicesService {
  private readonly logger = new Logger('MedicalServicesService');
  constructor(
    private readonly destinationsMedicalServiceService: DestinationsMedicalServicesService,
    private configService: ConfigService,
    private readonly sateMedicalServicesService: StateMedicalServicesService,
    @InjectRepository(MedicalService)
    private readonly medicalServicesRepository: Repository<MedicalService>,
  ) {}

  async createMedicalServices(
    createMedicalServicesDto: CreateMedicalServicesDto,
  ) {
    try {
      const stateNew = +this.configService.get<string>('stateNew');
      const { supports, insulationTypes } = createMedicalServicesDto;
      const medicalServiceSuports: Partial<Support>[] = supports.map(
        (support) => ({
          idSupport: +support,
        }),
      );
      const medicalServiceInsulationTypes: Partial<InsulationType>[] =
        insulationTypes.map((insulationType) => ({
          idInsulationType: +insulationType,
        }));
      const createMedicalServiceData = this.medicalServicesRepository.create({
        ...createMedicalServicesDto,
        supports: medicalServiceSuports,
        insulationTypes: medicalServiceInsulationTypes,
      });
      const saveMedicalServices = await this.medicalServicesRepository.save(
        createMedicalServiceData,
      );
      await this.sateMedicalServicesService.createStateMedicalServicesChange({
        idMedicalService: saveMedicalServices.idMedicalService,
        idStateMedicalService: stateNew,
        fromMedicalRecord: 1,
      });
      await this.destinationsMedicalServiceService.createDestinationMedicalService(
        {
          idMedicalService: saveMedicalServices.idMedicalService,
          destination: createMedicalServicesDto.destination,
        },
      );
      const findNewMedicalService =
        await this.medicalServicesRepository.findOne({
          where: { idMedicalService: saveMedicalServices.idMedicalService },
          relations: {
            patient: true,
            stateChange: {
              state: true,
            },
            assignment: {
              medical: true,
              medicalAssistant: true,
              driver: true,
              vehicle: true,
            },
            supports: true,
            diagnosis: true,
            eps: true,
            contractingClient: true,
            serviceType: true,
            municipality: {
              department: true,
            },
            populationZone: true,
            insulationTypes: true,
            medicalServiceSignatures: true,
          },
        });

      return {
        message: 'Servicio generado con éxito',
        medicalService: findNewMedicalService,
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
  async updateMedicalServices(
    idMedicalService: string,
    updateMedicalServicesDto: UpdateMedicalServicesDto,
    forceChangeState = false,
  ) {
    try {
      const findMedicalServiceToEdit =
        await this.medicalServicesRepository.findOneBy({
          idMedicalService,
        });

      if (!findMedicalServiceToEdit) {
        throw new HttpException('Servicio no encontrado', HttpStatus.NOT_FOUND);
      }
      let responseChangeStatus: { message: string; stateChange?: any } = {
        message: '',
      };
      if (
        findMedicalServiceToEdit.idStateMedicalService !==
          updateMedicalServicesDto.idStateMedicalService ||
        forceChangeState
      ) {
        responseChangeStatus =
          await this.sateMedicalServicesService.createStateMedicalServicesChange(
            {
              idMedicalService: idMedicalService,
              idStateMedicalService:
                updateMedicalServicesDto.idStateMedicalService,
              fromMedicalRecord: updateMedicalServicesDto.fromMedicalRecord,
              mileage: updateMedicalServicesDto.mileage,
            },
          );
      }

      const { supports, insulationTypes } = updateMedicalServicesDto;
      const medicalServiceSuports: Partial<Support>[] =
        supports?.map((support) => ({
          idSupport: +support,
        })) ?? findMedicalServiceToEdit.supports;

      const medicalServiceInsulationTypes: Partial<InsulationType>[] =
        insulationTypes?.map((insulationType) => ({
          idInsulationType: +insulationType,
        })) ?? findMedicalServiceToEdit.insulationTypes;
      const newDataForMedicalService = {
        ...findMedicalServiceToEdit,
        ...updateMedicalServicesDto,
        supports: medicalServiceSuports,
        insulationTypes: medicalServiceInsulationTypes,
      };

      const saveMedicalServices = await this.medicalServicesRepository.save(
        newDataForMedicalService,
      );
      if (updateMedicalServicesDto.destination) {
        await this.destinationsMedicalServiceService.createDestinationMedicalService(
          {
            idMedicalService: saveMedicalServices.idMedicalService,
            destination: updateMedicalServicesDto.destination,
          },
        );
      }
      if (updateMedicalServicesDto.fromMedicalRecord) {
        return {
          message: responseChangeStatus.message,
          stateChange: responseChangeStatus.stateChange,
          statusCode: 201,
        };
      }
      return {
        message: 'Servicio actualizado con éxito',
        medicalService: newDataForMedicalService,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getMedicalServices() {
    try {
      const findMedicalServices = await this.medicalServicesRepository.find({
        relations: {
          patient: true,
          currentState: true,
          stateChange: {
            state: true,
          },
          assignment: {
            medical: true,
            medicalAssistant: true,
            driver: true,
            vehicle: true,
          },
          supports: true,
          diagnosis: true,
          eps: true,
          contractingClient: true,
          serviceType: true,
          municipality: {
            department: true,
          },
          populationZone: true,
          insulationTypes: true,
          medicalServiceSignatures: true,
          transferFiles: true,
          accompanyingPerson: {
            documentType: true,
          },
          informedConsent: {
            concernsPatientInformedConsent: true,
            procedureRiskInformedConsent: true,
          },
          satisfactionSurvey: true,
        },
      });

      if (findMedicalServices.length === 0) {
        throw new HttpException('No existen servicios', HttpStatus.NOT_FOUND);
      }
      return {
        medicalService: findMedicalServices,
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

  async getMedicalServiceByDateRange(
    getMedicalServiceByDateRangeDto: GetMedicalServiceByDateRangeDto,
  ) {
    try {
      const { startDate, endDate } = getMedicalServiceByDateRangeDto;
      const start = moment(startDate).startOf('day').toDate();
      const end = moment(endDate).endOf('day').toDate();
      const findMedicalServices = await this.medicalServicesRepository.find({
        where: {
          dateProgrammed: Between(start, end),
        },
        order: {
          dateProgrammed: 'ASC',
        },
        relations: {
          patient: {
            documentType: true,
          },
          stateChange: {
            state: true,
          },
          eps: true,
          diagnosis: true,
          serviceType: true,
          contractingClient: true,
          supports: true,
          municipality: {
            department: true,
          },
          assignment: {
            medical: true,
            medicalAssistant: true,
            driver: true,
            vehicle: true,
          },
          populationZone: true,
          currentState: true,
          insulationTypes: true,
          medicalServiceSignatures: true,
          transferFiles: true,
          accompanyingPerson: {
            documentType: true,
          },
          informedConsent: {
            concernsPatientInformedConsent: true,
            procedureRiskInformedConsent: true,
          },
          medicalRecord: true,
          satisfactionSurvey: true,
          checklistTabTam: true,
        },
      });

      return {
        medicalService: findMedicalServices,
        statusCode: 200,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getMedicalServiceByDate(
    getMedicalServiceByDateDto: GetMedicalServiceByDateDto,
  ) {
    try {
      const { dateProgrammed } = getMedicalServiceByDateDto;
      return this.getMedicalServiceByDateRange({
        startDate: dateProgrammed,
        endDate: dateProgrammed,
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getMedicalServiceByProgrammingDate(
    getMedicalServiceByDateDto: GetMedicalServiceByDateRangeDto,
  ) {
    try {
      const { startDate, endDate } = getMedicalServiceByDateDto;
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      const findMedicalServices = await this.medicalServicesRepository.find({
        where: {
          dateProgrammed: Between(startDate, endDate),
        },
        relations: {
          patient: {
            documentType: true,
          },
          stateChange: {
            state: true,
          },
          eps: true,
          diagnosis: true,
          serviceType: true,
          contractingClient: true,
          supports: true,
          municipality: {
            department: true,
          },
          assignment: {
            medical: true,
            medicalAssistant: true,
            driver: true,
            vehicle: true,
          },
          currentState: true,
          insulationTypes: true,
          medicalServiceSignatures: true,
          transferFiles: true,
        },
      });
      return {
        medicalService: findMedicalServices,
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

  async getMedicalServicePaginator(
    getMedicalServicePaginatorDto: GetMedicalServicePaginatorDto,
  ): Promise<any> {
    try {
      const { page, limit, wordsFilter } = getMedicalServicePaginatorDto;
      const offset = pageToOffset(page, limit);
      let getMediclaServices = {};
      if (wordsFilter) {
        getMediclaServices = await this.medicalServicesRepository.findAndCount({
          where: [
            {
              destination: wordsFilter,
            },
          ],
          relations: {
            patient: true,
            stateChange: {
              state: true,
            },
            eps: true,
            contractingClient: true,
            serviceType: true,
            municipality: {
              department: true,
            },
            populationZone: true,
          },
          take: limit,
          skip: offset,
        });
      } else {
        getMediclaServices = await this.medicalServicesRepository.findAndCount({
          relations: {
            patient: true,
            stateChange: {
              state: true,
            },
            eps: true,
            contractingClient: true,
            serviceType: true,
            municipality: {
              department: true,
            },
            populationZone: true,
          },
          take: limit,
          skip: offset,
        });
      }
      const [medicalService, total] = getMediclaServices as [
        MedicalService[],
        number,
      ];
      console.log('medicalService', medicalService);

      return {
        medicalService,
        total,
        statusCode: 200,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message ||
          'Hubo un error en la solicitud. Por favor, intente de nuevo más tarde.',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
