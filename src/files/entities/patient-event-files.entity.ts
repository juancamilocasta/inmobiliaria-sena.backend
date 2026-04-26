import { FileType } from 'src/file-types/entities/file-type.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('patientEventFiles')
export class PatientEventFile {
  @PrimaryGeneratedColumn('increment', { name: 'idPatientEventFile' })
  idPatientEventFile: number;
  @Column('varchar', { name: 'fileName', unique: true })
  fileName: string;
  @Column('varchar', { name: 'idPatientEventRegister' })
  idPatientEventRegister: string;
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
