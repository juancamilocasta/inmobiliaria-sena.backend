import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof QueryFailedError) {
          throw new HttpException(
            'Esta intentado guardar un elemento que ya existe, por favor valide su información',
            HttpStatus.CONFLICT,
          );
        }
        throw new HttpException(
          err.message ||
            'Error en el servidor. Por favor, inténtelo de nuevo más tarde',
          err.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }
}
