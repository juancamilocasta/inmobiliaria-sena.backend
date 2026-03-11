import { Module } from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';
import { DiagnosisController } from './diagnosis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diagnosis } from './entities/diagnosis.entity';

@Module({
  controllers: [DiagnosisController],
  providers: [DiagnosisService],
  exports: [DiagnosisService],
  imports: [TypeOrmModule.forFeature([Diagnosis])],
})
export class DiagnosisModule {}
