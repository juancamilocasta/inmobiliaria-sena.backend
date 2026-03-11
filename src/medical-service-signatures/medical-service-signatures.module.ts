import { Module } from '@nestjs/common';
import { MedicalServiceSignaturesService } from './medical-service-signatures.service';
import { MedicalServiceSignaturesController } from './medical-service-signatures.controller';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalServiceSignature } from './entities/medical-service-signature.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicalServiceSignature, User]),
    AuthModule,
  ],
  controllers: [MedicalServiceSignaturesController],
  providers: [MedicalServiceSignaturesService, AuthService],
  exports: [TypeOrmModule],
})
export class MedicalServiceSignaturesModule {}
