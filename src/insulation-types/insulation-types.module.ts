import { Module } from '@nestjs/common';
import { InsulationTypesService } from './insulation-types.service';
import { InsulationTypesController } from './insulation-types.controller';
import { InsulationType } from './entities/insulation-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([InsulationType])],
  controllers: [InsulationTypesController],
  providers: [InsulationTypesService],
  exports: [TypeOrmModule],
})
export class InsulationTypesModule {}
