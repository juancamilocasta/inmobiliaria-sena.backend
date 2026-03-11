import { Module } from '@nestjs/common';
import { SupportsService } from './supports.service';
import { SupportsController } from './supports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Support } from './entities/supports.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Support])],
  controllers: [SupportsController],
  providers: [SupportsService],
  exports: [SupportsService],
})
export class SupportsModule {}
