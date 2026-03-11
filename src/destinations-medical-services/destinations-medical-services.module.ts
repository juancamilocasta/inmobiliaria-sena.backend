import { Module } from '@nestjs/common';
import { DestinationsMedicalServicesService } from './destinations-medical-services.service';
import { DestinationsMedicalServicesController } from './destinations-medical-services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinationsMedicalService } from './entities/destinations-medical-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DestinationsMedicalService])],
  controllers: [DestinationsMedicalServicesController],
  providers: [DestinationsMedicalServicesService],
  exports: [TypeOrmModule],
})
export class DestinationsMedicalServicesModule {}
