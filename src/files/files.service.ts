import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransferFile } from './entities/transfer-files.entity';
import { EventFile } from './entities/event-files.entity';
import { FileType } from 'src/file-types/entities/file-type.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { User } from 'src/users/entities/user.entity';
import { PatientEventFile } from './entities/patient-event-files.entity';

@Injectable()
export class FilesService {
  private readonly logger = new Logger('FilesService');

  constructor(
    @InjectRepository(PatientEventFile)
    private readonly patientEventFileRepository: Repository<PatientEventFile>,
    @InjectRepository(TransferFile)
    private readonly transferFileRepository: Repository<TransferFile>,
    @InjectRepository(EventFile)
    private readonly eventFileRepository: Repository<EventFile>,
    @InjectRepository(FileType)
    private readonly fileTypeRepository: Repository<FileType>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async saveTransferServiceFileData(body: CreateFileDto, fileName: string) {
    try {
      const { idMedicalService, idFileType } = body;

      const getFileType = await this.fileTypeRepository.findOne({
        where: {
          idFileType: idFileType,
        },
      });

      if (!getFileType) {
        throw new HttpException(
          'Tipo de archivo no encontrado',
          HttpStatus.NOT_FOUND,
        );
      }

      const existingFile = await this.transferFileRepository.findOne({
        where: {
          idMedicalService: idMedicalService,
          idFileType: getFileType.idFileType,
        },
      });

      if (existingFile) {
        this.logger.log(
          `Archivo existente encontrado para el servicio ${idMedicalService}, eliminando archivo previo.`,
        );
        await this.transferFileRepository.remove(existingFile);

        const newFile = this.transferFileRepository.create({
          fileName,
          idMedicalService: idMedicalService,
          idFileType: getFileType.idFileType,
        });
        const savedFile = await this.transferFileRepository.save(newFile);

        if (!savedFile) {
          throw new HttpException(
            'No se pudo guardar el archivo',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }

        return newFile;
      } else {
        const newFile = this.transferFileRepository.create({
          fileName,
          idMedicalService: String(idMedicalService),
          idFileType: getFileType.idFileType,
        });
        const savedFile = await this.transferFileRepository.save(newFile);

        if (!savedFile) {
          throw new HttpException(
            'No se pudo guardar el archivo',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
        return newFile;
      }
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async savePatientEventServiceFileData(body: CreateFileDto, fileName: string) {
    try {
      const { idPatientEventRegister, idFileType } = body;

      const getFileType = await this.fileTypeRepository.findOne({
        where: {
          idFileType,
        },
      });

      if (!getFileType) {
        throw new HttpException(
          'Tipo de archivo no encontrado',
          HttpStatus.NOT_FOUND,
        );
      }

      const existingFile = await this.patientEventFileRepository.findOne({
        where: {
          idPatientEventRegister,
          idFileType: getFileType.idFileType,
        },
      });

      if (existingFile) {
        this.logger.log(
          `Archivo existente encontrado para el evento ${idPatientEventRegister}, eliminando archivo previo.`,
        );
        await this.patientEventFileRepository.remove(existingFile);

        const newFile = this.patientEventFileRepository.create({
          fileName,
          idPatientEventRegister,
          idFileType: getFileType.idFileType,
        });
        const savedFile = await this.patientEventFileRepository.save(newFile);

        if (!savedFile) {
          throw new HttpException(
            'No se pudo guardar el archivo',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
        return newFile;
      } else {
        const newFile = this.patientEventFileRepository.create({
          fileName,
          idPatientEventRegister,
          idFileType: getFileType.idFileType,
        });
        const savedFile = await this.patientEventFileRepository.save(newFile);
        if (!savedFile) {
          throw new HttpException(
            'No se pudo guardar el archivo',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
        return newFile;
      }
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async saveEventServiceFileData(body: CreateFileDto, fileName: string) {
    try {
      const { idEvent, idFileType } = body;

      const getFileType = await this.fileTypeRepository.findOne({
        where: {
          idFileType: idFileType,
        },
      });

      if (!getFileType) {
        throw new HttpException(
          'Tipo de archivo no encontrado',
          HttpStatus.NOT_FOUND,
        );
      }

      const existingFile = await this.eventFileRepository.findOne({
        where: {
          idEvent,
          idFileType: getFileType.idFileType,
        },
      });

      if (existingFile) {
        this.logger.log(
          `Archivo existente encontrado para el evento ${idEvent}, eliminando archivo previo.`,
        );
        await this.eventFileRepository.remove(existingFile);

        const newFile = this.eventFileRepository.create({
          fileName,
          idEvent,
          idFileType: getFileType.idFileType,
        });
        const savedFile = await this.eventFileRepository.save(newFile);

        if (!savedFile) {
          throw new HttpException(
            'No se pudo guardar el archivo',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
        return newFile;
      } else {
        const newFile = this.eventFileRepository.create({
          fileName,
          idEvent,
          idFileType: getFileType.idFileType,
        });
        const savedFile = await this.eventFileRepository.save(newFile);
        if (!savedFile) {
          throw new HttpException(
            'No se pudo guardar el archivo',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
        return newFile;
      }
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async saveUserSignatureFileData(body: CreateFileDto, fileName: string) {
    try {
      const { idUser, idFileType } = body;

      const getFileType = await this.fileTypeRepository.findOne({
        where: {
          idFileType: idFileType,
        },
      });

      if (!getFileType) {
        throw new HttpException(
          'Tipo de archivo no encontrado',
          HttpStatus.NOT_FOUND,
        );
      }

      const updatedUser = await this.userRepository.update(idUser, {
        signatureFileName: fileName,
      });

      if (!updatedUser) {
        throw new HttpException(
          'No se pudo guardar el archivo',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return fileName;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
