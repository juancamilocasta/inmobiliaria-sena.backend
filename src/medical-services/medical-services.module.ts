import { Module } from '@nestjs/common';
import { MedicalServicesService as MedicalServicesService } from './medical-services.service';
import { MedicalServiceController as MedicalServicesController } from './medical-services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from 'src/patient/entities/patient.entity';
import { MedicalService } from './entities/medical-services.entity';
import { StateMedicalService } from 'src/state-medical-services/entities/state-medical-services.entity';
import { StateMedicalServicesModule } from 'src/state-medical-services/state-medical-services.module';
import { Support } from 'src/supports/entities/supports.entity';
import { Eps } from 'src/eps/entities/eps.entity';
import { Diagnosis } from 'src/diagnosis/entities/diagnosis.entity';
import { ServiceType } from 'src/service-type/entities/service-type.entity';
import { ContractingClient } from 'src/contracting-clients/entities/contracting-client.entity';
import { DestinationsMedicalServicesModule } from 'src/destinations-medical-services/destinations-medical-services.module';
import { DestinationsMedicalServicesService } from 'src/destinations-medical-services/destinations-medical-services.service';

@Module({
  controllers: [MedicalServicesController],
  providers: [MedicalServicesService, DestinationsMedicalServicesService],
  exports: [TypeOrmModule, MedicalServicesService],
  imports: [
    StateMedicalServicesModule,
    TypeOrmModule.forFeature([
      MedicalService,
      Patient,
      StateMedicalService,
      Support,
      Eps,
      Diagnosis,
      ServiceType,
      ContractingClient,
    ]),
    DestinationsMedicalServicesModule,
  ],
})
export class MedicalServiceModule {}
