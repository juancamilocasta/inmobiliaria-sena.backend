import { Module } from '@nestjs/common';
import { ContractingClientsServicesService } from './contracting-clients-services.service';
import { ContractingClientsServicesController } from './contracting-clients-services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractingClientsService } from './entities/contracting-clients-service.entity';

@Module({
  controllers: [ContractingClientsServicesController],
  providers: [ContractingClientsServicesService],
  imports: [TypeOrmModule.forFeature([ContractingClientsService])],
})
export class ContractingClientsServicesModule {}
