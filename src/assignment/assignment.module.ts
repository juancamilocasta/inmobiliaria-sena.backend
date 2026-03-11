import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { MedicalServiceModule } from 'src/medical-services/medical-services.module';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment]), MedicalServiceModule],
  controllers: [AssignmentController],
  providers: [AssignmentService],
  exports: [TypeOrmModule],
})
export class AssignmentModule {}
