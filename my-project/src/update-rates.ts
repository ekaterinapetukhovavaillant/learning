import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UpdateCurrenciesExchangeService } from './exchange/service/update-currencies-exchange.service';

async function start(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const updateCurrenciesExchangeService = app.get(
    UpdateCurrenciesExchangeService,
  );

  await updateCurrenciesExchangeService.execute();

  console.log('Done with rates');
}

start();
