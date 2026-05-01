import { Module } from '@nestjs/common';
import { PropiertyImagesService } from './propierty-images.service';
import { PropiertyImagesController } from './propierty-images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropiertyImage } from './entities/propierty-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PropiertyImage])],
  controllers: [PropiertyImagesController],
  providers: [PropiertyImagesService],
  exports: [PropiertyImagesService],
})
export class PropiertyImagesModule { }
