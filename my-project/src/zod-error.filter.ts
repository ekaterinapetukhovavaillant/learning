import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { ZodError } from 'zod';

@Catch(ZodError)
export class ZodValidationErrorFilter implements ExceptionFilter {
  public catch(exception: ZodError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errors = exception.errors.map((x) => {
      let fieldPath = x.path
        .map((y) => {
          if (typeof y === 'number') {
            return `[${y}]`;
          } else {
            return `.${y}`;
          }
        })
        .join('');
      if (fieldPath.startsWith('.')) {
        fieldPath = fieldPath.substring(1);
      }
      return {
        path: fieldPath,
        message: x.message,
        code: x.code,
      };
    });

    response.status(400).json({
      statusCode: 400,
      message: 'Validation failed',
      errors,
    });
  }
}
