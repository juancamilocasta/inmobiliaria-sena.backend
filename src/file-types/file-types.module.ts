import { Module } from '@nestjs/common';
import { FileTypesService } from './file-types.service';
import { FileTypesController } from './file-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileType } from './entities/file-type.entity';

@Module({
  controllers: [FileTypesController],
  imports: [TypeOrmModule.forFeature([FileType])],
  providers: [FileTypesService],
  exports: [TypeOrmModule],
})
export class FileTypesModule {}
