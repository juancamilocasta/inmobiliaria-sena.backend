import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigCompanyModule } from 'src/config-company/config-company.module';
import { ConfigCompanyService } from 'src/config-company/config-company.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigCompanyModule],
  controllers: [UsersController],
  providers: [UsersService, ConfigCompanyService],
  exports: [TypeOrmModule, UsersService, ConfigCompanyService],
})
export class UsersModule {}
