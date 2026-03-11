import { Module } from '@nestjs/common';
import { MedicalRecordService } from './medical-record.service';
import { MedicalRecordController } from './medical-record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalRecord } from './entities/medical-record.entity';
import { StateMedicalServicesModule } from 'src/state-medical-services/state-medical-services.module';
import { MedicalServiceModule } from 'src/medical-services/medical-services.module';
import { StateMedicalServicesChange } from 'src/state-medical-services/entities/medical-services-state-change.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicalRecord]),
    StateMedicalServicesModule,
    MedicalServiceModule,
    StateMedicalServicesChange,
  ],
  controllers: [MedicalRecordController],
  providers: [MedicalRecordService],
  exports: [TypeOrmModule],
})
export class MedicalRecordModule {}
