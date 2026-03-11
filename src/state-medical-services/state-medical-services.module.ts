import { Module } from '@nestjs/common';
import { StateMedicalServicesService } from './state-medical-services.service';
import { StateMedicalServicesController } from './state-medical-services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateMedicalService } from './entities/state-medical-services.entity';
import { MedicalService } from 'src/medical-services/entities/medical-services.entity';
import { StateMedicalServicesChange } from './entities/medical-services-state-change.entity';

@Module({
  controllers: [StateMedicalServicesController],
  providers: [StateMedicalServicesService],
  exports: [TypeOrmModule, StateMedicalServicesService],
  imports: [
    TypeOrmModule.forFeature([
      StateMedicalService,
      MedicalService,
      StateMedicalServicesChange,
    ]),
  ],
})
export class StateMedicalServicesModule {}
