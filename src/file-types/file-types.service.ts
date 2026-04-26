import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileType } from './entities/file-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileTypesService {
  private readonly logger = new Logger('FileTypesService');

  constructor(
    @InjectRepository(FileType)
    private readonly FileTypeRepository: Repository<FileType>,
  ) { }

  async findAllFileTypes(): Promise<FileType[]> {
    try {
      const responseFileType = await this.FileTypeRepository.find({
        where: { active: true },
      });
      if (!responseFileType) {
        throw new HttpException(
          'No se encontraron registros',
          HttpStatus.NOT_FOUND,
        );
      }
      return responseFileType;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
