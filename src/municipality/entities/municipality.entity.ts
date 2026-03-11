import { ContractingClient } from 'src/contracting-clients/entities/contracting-client.entity';
import { Department } from 'src/departments/entities/department.entity';
import { Event } from 'src/events/entities/event.entity';
import { MedicalRecord } from 'src/medical-record/entities/medical-record.entity';
import { MedicalService } from 'src/medical-services/entities/medical-services.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('municipalities')
export class Municipality {
  @PrimaryGeneratedColumn('increment', { name: 'idMunicipality' })
  idMunicipality: number;
  @Column('varchar', { name: 'code' })
  code: string;
  @Column('varchar', { name: 'description' })
  description: string;
  @Column('tinyint', { name: 'active', default: true })
  active: boolean;
  @Column('int', { name: 'idDepartment' })
  idDepartment: number;
  @Column('char', { name: 'codeMin', length: 5 })
  codeMin: string;

  @ManyToOne(() => Department, (departamento) => departamento.municipalities, {
    nullable: false,
  })
  @JoinColumn({ name: 'idDepartment' })
  department: Department;

  @OneToMany(
    () => MedicalService,
    (medicalServices) => medicalServices.municipality,
  )
  medicalServices: MedicalService[];

  @OneToMany(() => Event, (event) => event.municipality)
  events: Event[];
  @OneToMany(
    () => MedicalRecord,
    (medicalRecord) => medicalRecord.municipalityResidencePatient,
  )
  medicalRecordsResidence: MedicalRecord[];

  @OneToMany(() => ContractingClient, (client) => client.municipality)
  contractingClients: ContractingClient[];
}
