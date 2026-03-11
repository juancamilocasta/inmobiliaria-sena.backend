import { Module } from '@nestjs/common';
import { ServiceTypeService } from './service-type.service';
import { ServiceTypeController } from './service-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceType } from './entities/service-type.entity';

@Module({
  controllers: [ServiceTypeController],
  providers: [ServiceTypeService],
  exports: [ServiceTypeService],
  imports: [TypeOrmModule.forFeature([ServiceType])],
})
export class ServiceTypeModule {}
