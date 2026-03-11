import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { TaxDetail } from './entities/tax-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaxDetailsService {
  constructor(
    @InjectRepository(TaxDetail)
    private readonly taxDetailRepository: Repository<TaxDetail>,
  ) {}

  async findAllTaxDetails() {
    try {
      const findResult = await this.taxDetailRepository.find({
        where: { isActive: true },
      });

      if (findResult.length === 0) {
        throw new HttpException(
          'No se encontraron datos, por favor contacte al administrador',
          HttpStatus.NOT_FOUND,
        );
      }

      return findResult;
    } catch (error) {
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
