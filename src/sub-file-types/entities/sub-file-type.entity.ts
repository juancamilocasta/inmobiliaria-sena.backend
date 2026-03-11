import { FileType } from 'src/file-types/entities/file-type.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('subFileTypes')
export class SubFileType {
  @PrimaryGeneratedColumn('increment', { name: 'idSubFileType' })
  idSubFileType: number;
  @Column('int', { name: 'idFileType' })
  idFileType: number;
  @Column('varchar', { name: 'description' })
  description: string;
  @Column('date', { name: 'creationDate' })
  creationDate: string;
  @Column('tinyint', { name: 'active' })
  active: boolean;

  @ManyToOne(() => FileType, (fileType) => fileType.subFileTypes)
  fileType: FileType;
}
