import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';
import { createTestApp } from '../../test/create-test-app';
import request from 'supertest';
import { createUserAndToken } from './create-user-utils';
import { ValidCurrency } from '../../src/validation/currency';

describe("Creation and user's wallet", () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    app = await createTestApp();

    const userAndToken = await createUserAndToken(app);

    token = userAndToken.token;
  });

  it("Should create user's wallet", async () => {
    const prisma = app.get(PrismaService);

    const walletData: ValidCurrency = { currency: 'EUR' };

    const response = await request(app.getHttpServer())
      .post('/wallet')
      .set('Authorization', `Bearer ${token}`)
      .send(walletData);

    expect(response.statusCode).toStrictEqual(201);

    const id = response.body.id;

    const wallet = await prisma.wallet.findUniqueOrThrow({
      where: {
        id,
      },
    });

    expect(wallet.currency).toStrictEqual(walletData.currency);
    expect(wallet.amount.toString()).toBe('0');
  });

  afterAll(async () => {
    await app.close();
  });
});
