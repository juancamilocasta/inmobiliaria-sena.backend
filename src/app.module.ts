import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PatientModule } from './patient/patient.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { VehiclesTypeModule } from './vehicles-type/vehicles-type.module';
import { StateMedicalServicesModule } from './state-medical-services/state-medical-services.module';
import { ServiceTypeModule } from './service-type/service-type.module';
import { ContractingClientModule } from './contracting-clients/contracting-clients.module';
import { DiagnosisModule } from './diagnosis/diagnosis.module';
import { SupportsModule } from './supports/supports.module';
import { EpsModule } from './eps/eps.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ConfigCompanyModule } from './config-company/config-company.module';
import { AssignmentModule } from './assignment/assignment.module';
import configuration from './config/configuration';
import { MedicalServiceModule } from './medical-services/medical-services.module';
import { DepartmentsModule } from './departments/departments.module';
import { MunicipalityModule } from './municipality/municipality.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth.guard';
import { DocumentTypesModule } from './document-types/document-types.module';
import { TechnicalServicesModule } from './technical-services/technical-services.module';
import { GendersModule } from './genders/genders.module';
import { PopulationZonesModule } from './populationZones/population-zones.module';
import { ContractingClientsServicesModule } from './contracting-clients-services/contracting-clients-services.module';
import { VinculationTypesModule } from './vinculation-types/vinculation-types.module';
import { EventsModule } from './events/events.module';
import { EventAssignmentsModule } from './event-assignments/event-assignments.module';
import { StateEventModule } from './state-event/state-event.module';
import { ClientTypesModule } from './client-types/client-types.module';
import { PersonTypesModule } from './person-types/person-types.module';
import { RelationshipsModule } from './relationships/relationships.module';
import { AccompanyingPersonModule } from './accompanying-person/accompanying-person.module';
import { FilesModule } from './files/files.module';
import { InsulationTypesModule } from './insulation-types/insulation-types.module';
import { SatisfactionSurveyQuestionsModule } from './satisfaction-survey-questions/satisfaction-survey-questions.module';
import { SatisfactionSurveyOptionsModule } from './satisfaction-survey-options/satisfaction-survey-options.module';
import { SatisfactionSurveyModule } from './satisfaction-survey/satisfaction-survey.module';
import { MedicalServiceSignaturesModule } from './medical-service-signatures/medical-service-signatures.module';
import { EventSignaturesModule } from './event-signatures/event-signatures.module';
import { FileTypesModule } from './file-types/file-types.module';
import { PhysicalExaminationModule } from './physical-examination/physical-examination.module';
import { MedicalRecordModule } from './medical-record/medical-record.module';
import { MaritalStatusModule } from './marital-status/marital-status.module';
import { OriginAttentionModule } from './origin-attention/origin-attention.module';
import { TransfersDuringServiceModule } from './transfers-during-service/transfers-during-service.module';
import { ChecklistTabTamModule } from './checklist-tab-tam/checklist-tab-tam.module';
import { InformedConsentModule } from './informed-consent/informed-consent.module';
import { ConcernsPatientInformedConsentModule } from './concerns-patient-informed-consent/concerns-patient-informed-consent.module';
import { ProcedureRisksInformedConsentModule } from './procedure-risks-informed-consent/procedure-risks-informed-consent.module';
import { DestinationsMedicalServicesModule } from './destinations-medical-services/destinations-medical-services.module';
import { TaxDetailsModule } from './tax-details/tax-details.module';
import { TaxResponsibilitiesModule } from './tax-responsibilities/tax-responsibilities.module';
import { PatientEventRegisterModule } from './patient-event-register/patient-event-register.module';
import { AssemblyRipsModule } from './assembly-rips/assembly-rips.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    AuthModule,
    PatientModule,
    VehiclesModule,
    VehiclesTypeModule,
    MedicalServiceModule,
    DocumentTypesModule,
    StateMedicalServicesModule,
    ServiceTypeModule,
    ContractingClientModule,
    DiagnosisModule,
    SupportsModule,
    EpsModule,
    UsersModule,
    RolesModule,
    ConfigCompanyModule,
    AssignmentModule,
    VehiclesModule,
    DepartmentsModule,
    MunicipalityModule,
    TechnicalServicesModule,
    GendersModule,
    PopulationZonesModule,
    ContractingClientsServicesModule,
    VinculationTypesModule,
    EventsModule,
    EventAssignmentsModule,
    StateEventModule,
    ClientTypesModule,
    PersonTypesModule,
    RelationshipsModule,
    AccompanyingPersonModule,
    FilesModule,
    InsulationTypesModule,
    SatisfactionSurveyQuestionsModule,
    SatisfactionSurveyOptionsModule,
    SatisfactionSurveyModule,
    MedicalServiceSignaturesModule,
    EventSignaturesModule,
    FileTypesModule,
    PhysicalExaminationModule,
    MedicalRecordModule,
    MaritalStatusModule,
    OriginAttentionModule,
    TransfersDuringServiceModule,
    ChecklistTabTamModule,
    InformedConsentModule,
    ConcernsPatientInformedConsentModule,
    ProcedureRisksInformedConsentModule,
    DestinationsMedicalServicesModule,
    TaxDetailsModule,
    TaxResponsibilitiesModule,
    PatientEventRegisterModule,
    AssemblyRipsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
