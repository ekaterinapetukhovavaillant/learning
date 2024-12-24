import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';
import { createTestApp } from '../../test/create-test-app';
import { createUserAndToken } from './create-user-utils';
import { Wallet } from '@prisma/client';
import request from 'supertest';

describe("Adding funds to user's wallet", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let token: string;
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

    walletUsd = await prisma.wallet.create({
      data: {
        ownerId: user.id,
        currency: WALLET_CURRENCY_USD,
      },
    });
  });

  it("Should add funds to the user's wallet in EUR", async () => {
    const amountData = {
      amount: 1000,
    };

    const response = await request(app.getHttpServer())
      .patch(`/wallet/${walletEur.currency}/add`)
      .set('Authorization', `Bearer ${token}`)
      .send(amountData);

    expect(response.statusCode).toStrictEqual(200);

    const existingWallet = await prisma.wallet.findUniqueOrThrow({
      where: {
        id: walletEur.id,
      },
    });

    expect(existingWallet.amount.toNumber()).toBe(1000);
    expect(existingWallet.currency).toStrictEqual(WALLET_CURRENCY_EUR);
  });

  it("Should add funds to the user's wallet in USD", async () => {
    const amountData = {
      amount: 1000,
    };

    const response = await request(app.getHttpServer())
      .patch(`/wallet/${walletUsd.currency}/add`)
      .set('Authorization', `Bearer ${token}`)
      .send(amountData);

    expect(response.statusCode).toStrictEqual(200);

    const existingWallet = await prisma.wallet.findUniqueOrThrow({
      where: {
        id: walletUsd.id,
      },
    });

    expect(existingWallet.amount.toNumber()).toBe(1000);
    expect(existingWallet.currency).toStrictEqual(WALLET_CURRENCY_USD);
  });

  it("Should not add funds to the user's wallet (in EUR), if value of funds is less than zero", async () => {
    const amountData = {
      amount: -1000,
    };

    const response = await request(app.getHttpServer())
      .patch(`/wallet/${walletEur.currency}/add`)
      .set('Authorization', `Bearer ${token}`)
      .send(amountData);

    expect(response.statusCode).toStrictEqual(500);
  });

  afterAll(async () => {
    await app.close();
  });
});
