import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { BadRequestError } from '../erros/bad-request.error';

@Injectable()
export class BadRequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error): any => {
        if (error instanceof BadRequestError) {
          throw new BadRequestException(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}
