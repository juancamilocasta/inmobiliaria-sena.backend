import { Module } from '@nestjs/common';
import { MunicipalityService } from './municipality.service';
import { MunicipalityController } from './municipality.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Municipality } from './entities/municipality.entity';

@Module({
  controllers: [MunicipalityController],
  providers: [MunicipalityService],
  exports: [MunicipalityService],
  imports: [TypeOrmModule.forFeature([Municipality])],
})
export class MunicipalityModule {}
