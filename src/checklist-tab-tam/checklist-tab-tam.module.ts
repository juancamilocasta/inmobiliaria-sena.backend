import { Module } from '@nestjs/common';
import { ChecklistTabTamService } from './checklist-tab-tam.service';
import { ChecklistTabTamController } from './checklist-tab-tam.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChecklistTabTam } from './entities/checklist-tab-tam.entity';

@Module({
  controllers: [ChecklistTabTamController],
  providers: [ChecklistTabTamService],
  exports: [ChecklistTabTamService],
  imports: [TypeOrmModule.forFeature([ChecklistTabTam])],
})
export class ChecklistTabTamModule {}
