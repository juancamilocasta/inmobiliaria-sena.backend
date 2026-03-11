import { Module } from '@nestjs/common';
import { TaxDetailsService } from './tax-details.service';
import { TaxDetailsController } from './tax-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxDetail } from './entities/tax-detail.entity';

@Module({
  controllers: [TaxDetailsController],
  providers: [TaxDetailsService],
  imports: [TypeOrmModule.forFeature([TaxDetail])],
  exports: [TypeOrmModule],
})
export class TaxDetailsModule {}
