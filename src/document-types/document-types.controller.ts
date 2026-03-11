import { Controller, Get } from '@nestjs/common';

import { DocumentTypesService } from './document-types.service';
import { GetAllDocumentTypesResponse } from './interfaces/document-types.model';

@Controller('document-types')
export class DocumentTypesController {
  constructor(private readonly documentTypesService: DocumentTypesService) {}
  @Get()
  getTypesDocument(): Promise<GetAllDocumentTypesResponse> {
    return this.documentTypesService.getDocumentTypes();
  }
}
