import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Relationship } from './entities/relationship.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RelationshipsService {
  private logger = new Logger('RelationshipsService');
  constructor(
    @InjectRepository(Relationship)
    private readonly relationshipRepository: Repository<Relationship>,
  ) {}

  async getAllRelationships(): Promise<Relationship[]> {
    try {
      const response = await this.relationshipRepository.find({
        where: { active: true },
      });

      if (response.length === 0) {
        throw new HttpException(
          'No existen datos para mostrar',
          HttpStatus.NOT_FOUND,
        );
      }

      return response;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
