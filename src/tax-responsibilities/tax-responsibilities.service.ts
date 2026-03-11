import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaxResponsibility } from './entities/tax-responsibility.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaxResponsibilitiesService {
  constructor(
    @InjectRepository(TaxResponsibility)
    private readonly taxResponsibilityRepository: Repository<TaxResponsibility>,
  ) {}
  async findAllTaxResponsibilities() {
    try {
      const findResult = await this.taxResponsibilityRepository.find({
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
