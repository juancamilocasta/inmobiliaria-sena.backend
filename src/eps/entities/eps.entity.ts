import { MedicalService } from 'src/medical-services/entities/medical-services.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('eps')
export class Eps {
  @PrimaryGeneratedColumn('increment', { name: 'idEps' })
  idEps: number;
  @Column('varchar', { name: 'description', unique: true })
  description: string;
  @Column('tinyint', { name: 'active', default: true })
  active: boolean;
  @OneToMany(() => MedicalService, (medicalServices) => medicalServices.eps)
  medicalServices: MedicalService[];
}
