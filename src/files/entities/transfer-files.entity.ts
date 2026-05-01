import { FileType } from 'src/file-types/entities/file-type.entity';
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

  @ManyToOne(() => FileType, (fileType) => fileType.transferFiles)
  @JoinColumn({ name: 'idFileType' })
  fileType: FileType;
}
