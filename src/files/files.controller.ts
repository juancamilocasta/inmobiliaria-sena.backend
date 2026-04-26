import {
  BadRequestException,
  Body,
  Controller,
  Param,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
  StreamableFile,
  Get,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { fileInterceptor } from 'src/interceptors/file.interceptor';
import { FileTypeValidationPipe } from 'src/pipes/file-type-validation.pipe';
import { fileTypesByExtension, MAX_FILE_SIZE } from 'src/config/file.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { CreateFileDto } from './dto/create-file.dto';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  /*
  manejamos 4 carpetas
  firmas_empleados
  firmas_pacientes
    firma_encuesta
    firma_CI
  firmas_terceros
    firma_entrega_paciente
  adjuntos

  */
  @UseInterceptors(fileInterceptor)
  @Post(':idFileType')
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: MAX_FILE_SIZE })
        .build({ fileIsRequired: true }),
      new FileTypeValidationPipe(),
    )
    file: Express.Multer.File,
    @Body() body: CreateFileDto,
  ) {
    const fileName = file?.filename ?? null;

    if (!fileName) {
      throw new BadRequestException('Error en la carga del archivo');
    }

    if (body.idMedicalService) {
      return this.filesService.saveTransferServiceFileData(body, fileName);
    }

    if (body.idPatientEventRegister) {
      return this.filesService.savePatientEventServiceFileData(body, fileName);
    }
    if (body.idEvent) {
      return this.filesService.saveEventServiceFileData(body, fileName);
    }
    if (body.idUser) {
      return this.filesService.saveUserSignatureFileData(body, fileName);
    }
    throw new BadRequestException('Tipo de servicio no reconocido');
  }
  /* 
    @Post('cloudinary')
    @UseInterceptors(FileInterceptor('file'))
    async uploadToCloudinary(@UploadedFile() file: Express.Multer.File) {
      if (!file) {
        throw new BadRequestException('Archivo no enviado en el campo file');
      }
      const result = await this.filesService.uploadFileToCloudinary(file);
      return {
        message: 'Archivo subido a Cloudinary correctamente',
        url: result.url,
        publicId: result.public_id,
        raw: result.raw,
      };
    }
   */
  @Get('/:idFileType/:fileName')
  getFile(
    @Param('idFileType') idFileType: string,
    @Param('fileName') fileName: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const filePath = path.join(
      process.cwd(),
      'static/uploads',
      idFileType,
      fileName,
    );
    if (!fs.existsSync(filePath)) {
      throw new BadRequestException('Archivo no encontrado');
    }
    const stream = fs.createReadStream(filePath);
    const extension = path.extname(filePath);
    response.set({
      'Content-Disposition': `attachment; filename=${fileName}`,
      'Content-Type':
        fileTypesByExtension[extension] ?? 'application/octet-stream',
    });

    return new StreamableFile(stream);
  }
}
