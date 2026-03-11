import { MedicalService } from 'src/medical-services/entities/medical-services.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('medicalServiceSignatures')
export class MedicalServiceSignature {
  @PrimaryGeneratedColumn('increment', { name: 'idMedicalServiceSignature' })
  idMedicalServiceSignature: number;
  @Column('uuid', { name: 'idMedicalService' })
  idMedicalService: string;
  @Column('uuid', { name: 'signingUserId' })
  signingUserId: string;
  @Column('uuid', { name: 'approvingUserId' })
  approvingUserId: string;
  @Column('datetime', {
    name: 'createdAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
  @Column('tinyint', { name: 'active', default: 1 })
  active: number;

  @ManyToOne(() => MedicalService, (user) => user.medicalServiceSignatures)
  @JoinColumn({ name: 'idMedicalService' })
  medicalService: MedicalService;

  @ManyToOne(() => User, (user) => user.signingUsers)
  @JoinColumn({ name: 'signingUserId' })
  signingUser: User;

  @ManyToOne(() => User, (user) => user.approvingUsers)
  @JoinColumn({ name: 'approvingUserId' })
  approvingUser: User;
}
