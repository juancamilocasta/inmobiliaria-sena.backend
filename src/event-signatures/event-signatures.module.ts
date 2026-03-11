import { Module } from '@nestjs/common';
import { EventSignaturesService } from './event-signatures.service';
import { EventSignaturesController } from './event-signatures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { EventSignature } from './entities/event-signature.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventSignature, User]), AuthModule],
  controllers: [EventSignaturesController],
  providers: [EventSignaturesService, AuthService],
  exports: [TypeOrmModule],
})
export class EventSignaturesModule {}
