import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';

export const fileInterceptor = FileInterceptor('file', {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const { params } = req;
      const filePath = path.join('static', 'uploads', params.idFileType);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      cb(null, filePath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = file.originalname.split('.').pop();
      cb(null, `${uniqueSuffix}.${ext}`);
    },
  }),
});
