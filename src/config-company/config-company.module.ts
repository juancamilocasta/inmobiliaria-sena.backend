import { Module } from '@nestjs/common';
import { ConfigCompanyService } from './config-company.service';
import { ConfigCompanyController } from './config-company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigCompany } from './entities/config-company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigCompany])],
  controllers: [ConfigCompanyController],
  providers: [ConfigCompanyService],
  exports: [TypeOrmModule, ConfigCompanyService],
})
export class ConfigCompanyModule {}
