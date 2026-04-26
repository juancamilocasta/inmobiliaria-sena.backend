import { EventFile } from 'src/files/entities/event-files.entity';
import { TransferFile } from 'src/files/entities/transfer-files.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fileTypes')
export class FileType {
  @PrimaryGeneratedColumn('increment', { name: 'idFileType' })
  idFileType: number;
  @Column('varchar', { name: 'description' })
  description: string;
  @Column('date', { name: 'creationDate' })
  creationDate: Date;
  @Column('tinyint', { name: 'active' })
  active: boolean;


  @OneToMany(() => TransferFile, (transferFile) => transferFile.fileType)
  transferFiles: TransferFile[];

  @OneToMany(() => EventFile, (eventFile) => eventFile.fileType)
  eventFiles: TransferFile[];
}
