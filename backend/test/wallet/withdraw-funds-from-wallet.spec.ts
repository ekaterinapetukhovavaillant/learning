import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';
import { createTestApp } from '../../test/create-test-app';
import { createUserAndToken } from './create-user-utils';
import { Wallet } from '@prisma/client';
import request from 'supertest';
import { AddFundsToWalletService } from '../../src/wallet/service/add-funds-to-wallet.service';

describe("Withdrawing funds from user's wallet", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let token: string;
  let wallet: Wallet;

  const WALLET_ADDED_AMOUNT = 1000;
  const LESS_WALLET_AMOUNT = 800;
  const GREATER_WALLET_AMOUNT = 1200;

  const CURRENCY_EUR = 'EUR';

  beforeAll(async () => {
    app = await createTestApp();

    prisma = app.get(PrismaService);

    const addFundsToWalletService = app.get(AddFundsToWalletService);

    const userAndToken = await createUserAndToken(app);

    const user = userAndToken.user;

    token = userAndToken.token;

    wallet = await prisma.wallet.create({
      data: {
        ownerId: user.id,
        currency: CURRENCY_EUR,
      },
    });

    wallet = await addFundsToWalletService.execute(
      user,
      CURRENCY_EUR,
      WALLET_ADDED_AMOUNT,
    );
  });

  it("Should withdraw funds from the user's wallet", async () => {
    const amountData = {
      amount: LESS_WALLET_AMOUNT,
    };

    const response = await request(app.getHttpServer())
      .patch(`/wallet/${wallet.currency}/withdraw`)
      .set('Authorization', `Bearer ${token}`)
      .send(amountData);

    expect(response.statusCode).toStrictEqual(200);

    const existingWallet = await prisma.wallet.findUniqueOrThrow({
      where: {
        id: wallet.id,
      },
    });

    const result = WALLET_ADDED_AMOUNT - LESS_WALLET_AMOUNT;

    expect(existingWallet.amount.toNumber()).toBe(result);
  });

  it("Should not withdraw funds from the user's wallet, if amount of funds is greater than wallet's amount", async () => {
    const amountData = {
      amount: GREATER_WALLET_AMOUNT,
    };

    const response = await request(app.getHttpServer())
      .patch(`/wallet/${wallet.currency}/withdraw`)
      .set('Authorization', `Bearer ${token}`)
      .send(amountData);

    expect(response.statusCode).toStrictEqual(500);
  });

  afterAll(async () => {
    await app.close();
  });
});
