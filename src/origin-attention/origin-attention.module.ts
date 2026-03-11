import { Module } from '@nestjs/common';
import { OriginAttentionService } from './origin-attention.service';
import { OriginAttentionController } from './origin-attention.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OriginAttention } from './entities/origin-attention.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OriginAttention])],
  controllers: [OriginAttentionController],
  providers: [OriginAttentionService],
  exports: [TypeOrmModule],
})
export class OriginAttentionModule {}
