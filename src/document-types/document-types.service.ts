import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetAllDocumentTypesResponse } from './interfaces/document-types.model';
import { DocumentType } from './entities/document-type.entity';

@Injectable()
export class DocumentTypesService {
  private readonly logger = new Logger('DocumentTypesService');
  constructor(
    @InjectRepository(DocumentType)
    private readonly documentTypeRepository: Repository<DocumentType>,
  ) {}
  async getDocumentTypes(): Promise<GetAllDocumentTypesResponse> {
    try {
      const documentTypes = await this.documentTypeRepository.find({
        where: {
          active: 1,
        },
      });

      if (documentTypes.length === 0) {
        throw new HttpException(
          'No existen tipos de documento',
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        documentTypes,
        statusCode: 200,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
