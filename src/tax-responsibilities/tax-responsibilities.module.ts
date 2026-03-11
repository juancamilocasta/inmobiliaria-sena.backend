import { Module } from '@nestjs/common';
import { TaxResponsibilitiesService } from './tax-responsibilities.service';
import { TaxResponsibilitiesController } from './tax-responsibilities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxResponsibility } from './entities/tax-responsibility.entity';

@Module({
  controllers: [TaxResponsibilitiesController],
  providers: [TaxResponsibilitiesService],
  imports: [TypeOrmModule.forFeature([TaxResponsibility])],
  exports: [TypeOrmModule],
})
export class TaxResponsibilitiesModule {}
