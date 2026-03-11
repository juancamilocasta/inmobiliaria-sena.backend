import { Module } from '@nestjs/common';
import { RelationshipsService } from './relationships.service';
import { RelationshipsController } from './relationships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Relationship } from './entities/relationship.entity';

@Module({
  controllers: [RelationshipsController],
  providers: [RelationshipsService],
  imports: [TypeOrmModule.forFeature([Relationship])],
  exports: [TypeOrmModule],
})
export class RelationshipsModule {}
