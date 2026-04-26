import { Module } from '@nestjs/common';
import { PropiertyTypesService } from './propierty-types.service';
import { PropiertyTypesController } from './propierty-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropiertyType } from './entities/propierty-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PropiertyType])],
  controllers: [PropiertyTypesController],
  providers: [PropiertyTypesService],
  exports: [TypeOrmModule, PropiertyTypesService],
})
export class PropiertyTypesModule { }
