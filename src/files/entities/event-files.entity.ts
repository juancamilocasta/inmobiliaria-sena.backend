import { FileType } from 'src/file-types/entities/file-type.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('eventFiles')
export class EventFile {
  @PrimaryGeneratedColumn('increment', { name: 'idEventFile' })
  idEventFile: number;
  @Column('varchar', { name: 'fileName', unique: true })
  fileName: string;
  @Column('varchar', { name: 'idEvent' })
  idEvent: string;
  @Column('int', { name: 'idFileType' })
  idFileType: number;


  @ManyToOne(() => FileType, (fileType) => fileType.transferFiles)
  @JoinColumn({ name: 'idFileType' })
  fileType: FileType;
}
