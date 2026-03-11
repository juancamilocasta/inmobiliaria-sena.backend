import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChecklistTabTam } from './entities/checklist-tab-tam.entity';
import { Repository } from 'typeorm';
import { CreateChecklistTabTamDto } from './dto/create-checklist-tab-tam.dto';
import { UpdateChecklistTabTamDto } from './dto/update-checklist-tab-tam.dto';

@Injectable()
export class ChecklistTabTamService {
  private readonly logger = new Logger('ChecklistTabTamService');
  constructor(
    @InjectRepository(ChecklistTabTam)
    private readonly checklistTabTamRepository: Repository<ChecklistTabTam>,
  ) {}

  async create(createChecklistTabTamDto: CreateChecklistTabTamDto) {
    try {
      const checklistTabTam = await this.checklistTabTamRepository.create(
        createChecklistTabTamDto,
      );
      await this.checklistTabTamRepository.save(checklistTabTam);
      return checklistTabTam;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo.mas tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async update(
    idCheckListTabTam: string,
    updateChecklistTabTamDto: UpdateChecklistTabTamDto,
  ) {
    try {
      const findChecklistTabTam =
        await this.checklistTabTamRepository.findOneBy({
          idCheckListTabTam,
        });

      if (!findChecklistTabTam) {
        throw new HttpException(
          'Lista de chequeo no encontrada',
          HttpStatus.NOT_FOUND,
        );
      }
      const dataForSave = { ...updateChecklistTabTamDto, idCheckListTabTam };
      const saveChecklistTabTam = await this.checklistTabTamRepository.save(
        dataForSave,
      );
      return saveChecklistTabTam;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message ||
          'Error en el servidor. Por favor, inténtelo de nuevo.mas tarde',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
