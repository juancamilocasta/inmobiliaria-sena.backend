import { AccompanyingPerson } from 'src/accompanying-person/entities/accompanying-person.entity';
import { ContractingClient } from 'src/contracting-clients/entities/contracting-client.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('documentTypes')
export class DocumentType {
  @PrimaryGeneratedColumn('increment', { name: 'idDocumentType' })
  idDocumentType: number;
  @Column('varchar', { name: 'descriptionDocumentType' })
  descriptionDocumentType: string;
  @Column('varchar', { name: 'abbreviationDocumentType', unique: true })
  abbreviationDocumentType: string;
  @Column('tinyint', { name: 'active', select: false })
  active: number;
  @Column('char', { name: 'codeMin', length: 2 })
  codeMin: string;
  @OneToMany(() => Patient, (patient) => patient.documentType)
  patient: Patient[];

  @OneToMany(() => User, (user) => user.documentType)
  users: User[];

  @OneToMany(
    () => AccompanyingPerson,
    (accompanyingPerson) => accompanyingPerson.documentType,
  )
  accompanyingPersons: AccompanyingPerson[];

  @OneToMany(
    () => ContractingClient,
    (contractingClient) => contractingClient.documentType,
  )
  contractingClients: ContractingClient[];
}
