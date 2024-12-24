import { Module } from '@nestjs/common';
import { GetCurrenciesRateFromApiService } from './service/get-currencies-rate-from-api.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UpdateCurrenciesExchangeService } from './service/update-currencies-exchange.service';
@Module({
  imports: [PrismaModule],
  providers: [GetCurrenciesRateFromApiService, UpdateCurrenciesExchangeService],
})
export class ExchangeModule {}
