import { Module } from '@nestjs/common';
import { AccompanyingPersonService } from './accompanying-person.service';
import { AccompanyingPersonController } from './accompanying-person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccompanyingPerson } from './entities/accompanying-person.entity';

@Module({
  controllers: [AccompanyingPersonController],
  providers: [AccompanyingPersonService],
  imports: [TypeOrmModule.forFeature([AccompanyingPerson])],
  exports: [TypeOrmModule],
})
export class AccompanyingPersonModule {}
