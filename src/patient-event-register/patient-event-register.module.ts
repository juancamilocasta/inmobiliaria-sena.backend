import { Module } from '@nestjs/common';
import { PatientEventRegisterService } from './patient-event-register.service';
import { PatientEventRegisterController } from './patient-event-register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientEventRegister } from './entities/patient-event-register.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PatientEventRegister])],
  controllers: [PatientEventRegisterController],
  providers: [PatientEventRegisterService],
  exports: [TypeOrmModule],
})
export class PatientEventRegisterModule {}
