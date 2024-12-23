import { Injectable } from '@nestjs/common';
import { GetCurrenciesRateFromApiService } from './get-currencies-rate-from-api.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Currency } from '@prisma/client';

@Injectable()
export class UpdateCurrenciesExchangeService {
  public constructor(
    private readonly getCurrenciesRateFromApiService: GetCurrenciesRateFromApiService,
    private readonly prisma: PrismaService,
  ) {}

  public async execute(): Promise<void> {
    const currencies: Currency[] = ['EUR', 'USD', 'BYN', 'PLN', 'CUP'];

    currencies.forEach(async (currencyFrom) => {
      const currenciesTo = currencies.filter(
        (currencyTo) => currencyFrom !== currencyTo,
      );

      currenciesTo.forEach(async (currencyTo) => {
        const currenciesFromToData = {
          from: currencyFrom,
          to: currencyTo,
        };

        const rate = await this.getCurrenciesRateFromApiService.execute(
          currencyFrom,
          currencyTo,
        );

        await this.prisma.currenciesExchange.upsert({
          where: {
            from_to: currenciesFromToData,
          },
          update: {
            rate,
          },
          create: {
            rate,
            ...currenciesFromToData,
          },
        });
      });
    });
  }
}
