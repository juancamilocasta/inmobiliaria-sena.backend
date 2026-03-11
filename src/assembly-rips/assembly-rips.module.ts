import { Module } from '@nestjs/common';
import { AssemblyRipsService } from './assembly-rips.service';
import { AssemblyRipsController } from './assembly-rips.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssemblyRip } from './entities/assembly-rip.entity';
import { ConfigCompany } from 'src/config-company/entities/config-company.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { MedicalRecord } from 'src/medical-record/entities/medical-record.entity';
import { MedicalService } from 'src/medical-services/entities/medical-services.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AssemblyRip,
      ConfigCompany,
      Patient,
      MedicalRecord,
      MedicalService,
    ]),
  ],
  controllers: [AssemblyRipsController],
  providers: [AssemblyRipsService],
  exports: [TypeOrmModule],
})
export class AssemblyRipsModule {}
