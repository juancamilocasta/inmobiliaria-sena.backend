import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VinculationType } from './entities/vinculation-type.entity';
import { VinculationTypesController } from './vinculation-types.controller';
import { VinculationTypesService } from './vinculation-types.service';

@Module({
  imports: [TypeOrmModule.forFeature([VinculationType])],
  controllers: [VinculationTypesController],
  providers: [VinculationTypesService],
  exports: [TypeOrmModule],
})
export class VinculationTypesModule {}
