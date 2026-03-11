import { Module } from '@nestjs/common';
import { ContractingClientService } from './contracting-clients.service';
import { ContractingClientController } from './contracting-clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractingClient } from './entities/contracting-client.entity';

@Module({
  controllers: [ContractingClientController],
  imports: [TypeOrmModule.forFeature([ContractingClient])],
  providers: [ContractingClientService],
  exports: [TypeOrmModule],
})
export class ContractingClientModule {}
