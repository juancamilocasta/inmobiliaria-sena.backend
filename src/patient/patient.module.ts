import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { MedicalService } from 'src/medical-services/entities/medical-services.entity';
import { DocumentType } from 'src/document-types/entities/document-type.entity';

@Module({
  controllers: [PatientController],
  providers: [PatientService],
  exports: [TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Patient, MedicalService, DocumentType])],
})
export class PatientModule {}
