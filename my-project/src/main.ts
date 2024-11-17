import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationErrorFilter } from './exceptions/zod-vallidation-error.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(app.get(ZodValidationErrorFilter));
  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
