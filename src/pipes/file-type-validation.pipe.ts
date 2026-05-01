import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileTypeValidationPipe implements PipeTransform {
  async transform(value: Express.Multer.File) {
    const { mimetype, destination, filename } = value;
    const validMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validMimeTypes.includes(mimetype)) {
      const filePath = path.join(destination, filename);
      fs.unlink(filePath, (err) => {
        if (err) throw new BadRequestException(err);
      });
      throw new BadRequestException('Invalid file type');
    }
    return value;
  }
}
