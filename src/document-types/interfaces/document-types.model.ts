import { DocumentType } from '../entities/document-type.entity';

export interface GetAllDocumentTypesResponse {
  documentTypes: DocumentType[];
  statusCode: number;
}
