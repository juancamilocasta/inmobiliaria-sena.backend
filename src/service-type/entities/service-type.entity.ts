import { ContractingClientsService } from 'src/contracting-clients-services/entities/contracting-clients-service.entity';
import { MedicalService } from 'src/medical-services/entities/medical-services.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('serviceTypes')
export class ServiceType {
  @PrimaryGeneratedColumn('increment', { name: 'idServiceType' })
  idServiceType: number;

  @Column('varchar', { name: 'description', unique: true })
  description: string;

  @Column('tinyint', { name: 'active', default: true })
  active: boolean;
  @OneToMany(
    () => MedicalService,
    (medicalServices) => medicalServices.serviceType,
  )
  medicalServices: MedicalService[];

  @OneToMany(
    () => ContractingClientsService,
    (contractingClientsService) => contractingClientsService.serviceType,
  )
  contractingClientsServices: ContractingClientsService[];
}
