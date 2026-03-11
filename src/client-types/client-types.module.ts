import { Module } from '@nestjs/common';
import { ClientTypesService } from './client-types.service';
import { ClientTypesController } from './client-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientType } from './entities/client-type.entity';

@Module({
  controllers: [ClientTypesController],
  providers: [ClientTypesService],
  imports: [TypeOrmModule.forFeature([ClientType])],
  exports: [TypeOrmModule],
})
export class ClientTypesModule {}
