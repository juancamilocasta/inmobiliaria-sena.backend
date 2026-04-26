import { Module } from '@nestjs/common';
import { PropiertyStatesService } from './propierty-states.service';
import { PropiertyStatesController } from './propierty-states.controller';
import { PropiertyState } from './entities/propierty-state.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PropiertyState])],
  controllers: [PropiertyStatesController],
  providers: [PropiertyStatesService],
  exports: [PropiertyStatesService],
})
export class PropiertyStatesModule { }
