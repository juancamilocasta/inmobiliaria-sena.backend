import { MedicalService } from 'src/medical-services/entities/medical-services.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vinculationTypes')
export class VinculationType {
  @PrimaryGeneratedColumn('increment', { name: 'idVinculationType' })
  idVinculationType: number;
  @Column('varchar', { name: 'descriptionVinculationType' })
  descriptionVinculationType: string;
  @Column('tinyint', { name: 'isActive', default: 1 })
  isActive: number;
  @Column('char', { name: 'codeMin' })
  codeMin: string;
  @OneToMany(
    () => MedicalService,
    (medicalServices) => medicalServices.vinculationType,
  )
  medicalServices: MedicalService[];
}
