import { FileType } from 'src/file-types/entities/file-type.entity';
import { MedicalService } from 'src/medical-services/entities/medical-services.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('transferFiles')
export class TransferFile {
  @PrimaryGeneratedColumn('increment', { name: 'idTransferFile' })
  idTransferFile: number;
  @Column('varchar', { name: 'fileName', unique: true })
  fileName: string;
  @Column('varchar', { name: 'idMedicalService' })
  idMedicalService: string;
  @Column('int', { name: 'idFileType' })
  idFileType: number;
  @Column('datetime', {
    name: 'dateCreated',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateCreated: string;
  @ManyToOne(
    () => MedicalService,
    (medicalService) => medicalService.transferFiles,
  )
  @JoinColumn({ name: 'idMedicalService' })
  medicalService: MedicalService;

  @ManyToOne(() => FileType, (fileType) => fileType.transferFiles)
  @JoinColumn({ name: 'idFileType' })
  fileType: FileType;
}
