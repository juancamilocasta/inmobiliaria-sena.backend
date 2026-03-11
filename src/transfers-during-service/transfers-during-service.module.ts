import { Module } from '@nestjs/common';
import { TransfersDuringServiceService } from './transfers-during-service.service';
import { TransfersDuringServiceController } from './transfers-during-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransfersDuringService } from './entities/transfers-during-service.entity';
import { StateMedicalServicesModule } from 'src/state-medical-services/state-medical-services.module';
import { MedicalServiceModule } from 'src/medical-services/medical-services.module';
import { StateMedicalServicesChange } from 'src/state-medical-services/entities/medical-services-state-change.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransfersDuringService]),
    StateMedicalServicesModule,
    MedicalServiceModule,
    StateMedicalServicesChange,
  ],
  controllers: [TransfersDuringServiceController],
  providers: [TransfersDuringServiceService],
  exports: [TypeOrmModule],
})
export class TransfersDuringServiceModule {}
