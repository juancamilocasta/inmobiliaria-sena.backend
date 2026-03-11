import { Module } from '@nestjs/common';
import { VehiclesTypeService } from './vehicles-type.service';
import { VehiclesTypeController } from './vehicles-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesType } from './entities/vehicles-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VehiclesType])],
  controllers: [VehiclesTypeController],
  providers: [VehiclesTypeService],
  exports: [TypeOrmModule],
})
export class VehiclesTypeModule {}
