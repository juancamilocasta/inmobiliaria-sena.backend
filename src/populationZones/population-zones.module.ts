import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PopulationZone } from './entities/population-zone.entity';
import { PopulationZonesController } from './population-zones.controller';
import { PopulationZonesService } from './population-zones.service';

@Module({
  imports: [TypeOrmModule.forFeature([PopulationZone])],
  controllers: [PopulationZonesController],
  providers: [PopulationZonesService],
  exports: [TypeOrmModule],
})
export class PopulationZonesModule {}
