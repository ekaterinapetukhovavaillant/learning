import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationErrorFilter } from './exceptions/zod-vallidation-error.filter';
import { UpdateCurrenciesExchangeService } from './exchange/service/update-currencies-exchange.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(app.get(ZodValidationErrorFilter));
  await app.listen(process.env.PORT ?? 3001);

  const updateCurrenciesExchangeService = app.get(
    UpdateCurrenciesExchangeService,
  );

  setInterval(() => updateCurrenciesExchangeService.execute(), 60000);
}

bootstrap();
