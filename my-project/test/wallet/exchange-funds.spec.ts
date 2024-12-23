import { INestApplication } from '@nestjs/common';
import { createTestApp } from '../create-test-app';
import { createUserAndToken } from './create-user-utils';
import { PrismaService } from '../../src/prisma/prisma.service';
import { Wallet } from '@prisma/client';
import request from 'supertest';

describe('Exchanging funds from one wallet to another', () => {
  let app: INestApplication;
  let token: string;
  let prisma: PrismaService;
  let walletEur: Wallet;
  let walletUsd: Wallet;

  const WALLET_CURRENCY_EUR = 'EUR';
  const WALLET_CURRENCY_USD = 'USD';

  beforeAll(async () => {
    app = await createTestApp();

    prisma = app.get(PrismaService);

    const userAndToken = await createUserAndToken(app);

    const user = userAndToken.user;

    token = userAndToken.token;

    walletEur = await prisma.wallet.create({
      data: {
        ownerId: user.id,
        currency: WALLET_CURRENCY_EUR,
      },
    });

    walletEur = await prisma.wallet.update({
      where: {
        id: walletEur.id,
      },
      data: {
        amount: 1000,
      },
    });

    walletUsd = await prisma.wallet.create({
      data: {
        ownerId: user.id,
        currency: WALLET_CURRENCY_USD,
      },
    });

    walletUsd = await prisma.wallet.update({
      where: {
        id: walletUsd.id,
      },
      data: {
        amount: 1000,
      },
    });

    await prisma.currenciesExchange.upsert({
      where: {
        from_to: {
          from: WALLET_CURRENCY_EUR,
          to: WALLET_CURRENCY_USD,
        },
      },
      create: {
        from: WALLET_CURRENCY_EUR,
        to: WALLET_CURRENCY_USD,
        rate: 1.05,
      },
      update: {
        rate: 1.05,
      },
    });
  });

  it('Should exchange funds from one wallet to another', async () => {
    const amountData = {
      amount: 500,
    };

    const exchangeCurrenciesRate =
      await prisma.currenciesExchange.findFirstOrThrow({
        where: {
          from: WALLET_CURRENCY_EUR,
          to: WALLET_CURRENCY_USD,
        },
      });

    const newAmount =
      exchangeCurrenciesRate.rate.toNumber() * amountData.amount;

    const newWalletEurAmount = walletEur.amount.toNumber() - amountData.amount;
    const newWalletUsdAmount = walletUsd.amount.toNumber() + newAmount;

    const response = await request(app.getHttpServer())
      .patch(`/wallet/exchange/${walletEur.currency}/${walletUsd.currency}`)
      .set('Authorization', `Bearer ${token}`)
      .send(amountData);

    expect(response.statusCode).toStrictEqual(200);

    const updatedWalletEur = await prisma.wallet.findUniqueOrThrow({
      where: {
        id: walletEur.id,
      },
    });

    const updatedWalletUsd = await prisma.wallet.findUniqueOrThrow({
      where: {
        id: walletUsd.id,
      },
    });

    expect(updatedWalletUsd.amount.toNumber()).toStrictEqual(
      newWalletUsdAmount,
    );
    expect(updatedWalletEur.amount.toNumber()).toStrictEqual(
      newWalletEurAmount,
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
