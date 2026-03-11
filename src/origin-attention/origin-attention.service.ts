import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OriginAttention } from './entities/origin-attention.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OriginAttentionService {
  private readonly logger = new Logger('OriginAttentionService');
  constructor(
    @InjectRepository(OriginAttention)
    private readonly originAttentionRepository: Repository<OriginAttention>,
  ) {}
  async findAllOriginAttention() {
    try {
      const originAttention = await this.originAttentionRepository.find({
        where: { active: 1 },
      });
      if (originAttention.length === 0) {
        throw new HttpException(
          'No hay registros de atención de origen',
          HttpStatus.NOT_FOUND,
        );
      }
      return originAttention;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
