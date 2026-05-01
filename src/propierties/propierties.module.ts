import { Module } from '@nestjs/common';
import { PropiertiesService } from './propierties.service';
import { PropiertiesController } from './propierties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Propierty } from './entities/propierty.entity';
import { PropiertyImagesModule } from 'src/propierty-images/propierty-images.module';

@Module({
  imports: [TypeOrmModule.forFeature([Propierty]), PropiertyImagesModule],
  controllers: [PropiertiesController],
  providers: [PropiertiesService],
  exports: [PropiertiesService],
})
export class PropiertiesModule { }
