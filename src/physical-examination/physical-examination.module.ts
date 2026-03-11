import { Module } from '@nestjs/common';
import { PhysicalExaminationService } from './physical-examination.service';
import { PhysicalExaminationController } from './physical-examination.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhysicalExamination } from './entities/physical-examination.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhysicalExamination])],
  controllers: [PhysicalExaminationController],
  providers: [PhysicalExaminationService],
  exports: [TypeOrmModule],
})
export class PhysicalExaminationModule {}
