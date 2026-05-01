import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { EventFile } from './entities/event-files.entity';
import { TransferFile } from './entities/transfer-files.entity';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { FileType } from 'src/file-types/entities/file-type.entity';
import { User } from 'src/users/entities/user.entity';
import { PatientEventFile } from './entities/patient-event-files.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EventFile,
      TransferFile,
      FileType,
      User,
      PatientEventFile,
    ]),
  ],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [TypeOrmModule],
})
export class FilesModule {}
