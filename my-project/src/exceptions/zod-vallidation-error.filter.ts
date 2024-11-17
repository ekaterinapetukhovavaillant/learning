import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { ZodError } from 'zod';

@Catch(ZodError)
export class ZodValidationErrorFilter implements ExceptionFilter {
  public catch(exception: ZodError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errors = exception.errors.map((error) => {
      return {
        path: error.path.toString(),
        statusCode: error.code,
        message: error.message,
      };
    });

    response.status(400).json({
      statusCode: 400,
      message: 'Validation failed',
      errors: errors,
    });
  }
}
