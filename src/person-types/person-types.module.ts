import { Module } from '@nestjs/common';
import { PersonTypesService } from './person-types.service';
import { PersonTypesController } from './person-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonType } from './entities/person-type.entity';

@Module({
  controllers: [PersonTypesController],
  providers: [PersonTypesService],
  imports: [TypeOrmModule.forFeature([PersonType])],
  exports: [TypeOrmModule],
})
export class PersonTypesModule {}
