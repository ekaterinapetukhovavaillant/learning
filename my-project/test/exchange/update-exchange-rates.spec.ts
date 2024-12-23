import { createTestApp } from '../create-test-app';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';
import { GetCurrenciesRateFromApiService } from '../../src/exchange/service/get-currencies-rate-from-api.service';
import { UpdateCurrenciesExchangeService } from '../../src/exchange/service/update-currencies-exchange.service';

describe('Updating of exchange rates', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  it('Should update exchange rates of currencies', async () => {
    const prisma = app.get(PrismaService);
    const getCurrenciesRateFromApiService = app.get(
      GetCurrenciesRateFromApiService,
    );
    const updateCurrenciesExchangeService = app.get(
      UpdateCurrenciesExchangeService,
    );

    const apiSpy = jest.spyOn(getCurrenciesRateFromApiService, 'execute');
    apiSpy.mockImplementation((from, to) => {
      if (from === 'EUR' && to === 'USD') {
        return Promise.resolve('1.9');
      }

      if (from === 'BYN' && to === 'PLN') {
        return Promise.resolve('1.5');
      }

      return Promise.resolve('1.2');
    });

    await updateCurrenciesExchangeService.execute();

    expect(apiSpy).toHaveBeenCalled();

    const exchangeEurToUsd = await prisma.currenciesExchange.findFirstOrThrow({
      where: {
        from: 'EUR',
        to: 'USD',
      },
    });

    const exchangeBynToPln = await prisma.currenciesExchange.findFirstOrThrow({
      where: {
        from: 'BYN',
        to: 'PLN',
      },
    });

    expect(exchangeEurToUsd.rate.toString()).toStrictEqual('1.9');
    expect(exchangeBynToPln.rate.toString()).toStrictEqual('1.5');
  });

  afterAll(async () => {
    await app.close();
  });
});
