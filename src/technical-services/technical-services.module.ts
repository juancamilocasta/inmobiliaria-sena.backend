import { Module } from '@nestjs/common';
import { TechnicalServicesService } from './technical-services.service';
import { TechnicalServicesController } from './technical-services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnicalService } from './entities/technical-service.entity';

@Module({
  controllers: [TechnicalServicesController],
  providers: [TechnicalServicesService],
  exports: [TypeOrmModule],
  imports: [TypeOrmModule.forFeature([TechnicalService])],
})
export class TechnicalServicesModule {}
