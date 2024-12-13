import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';
import { createTestApp } from '../../test/create-test-app';
import request from 'supertest';
import { createUserAndToken } from './create-user-utils';
import { Wallet } from '@prisma/client';

describe('Deleting of a wallet', () => {
  let app: INestApplication;
  let token: string;
  let wallet: Wallet;
  let prisma: PrismaService;

  beforeAll(async () => {
    app = await createTestApp();

    prisma = app.get(PrismaService);

    const userAndToken = await createUserAndToken(app);

    const user = userAndToken.user;

    token = userAndToken.token;

    wallet = await prisma.wallet.create({
      data: {
        ownerId: user.id,
        currency: 'EUR',
      },
    });
  });

  it("Should delete user's wallet", async () => {
    const response = await request(app.getHttpServer())
      .delete(`/wallet/${wallet.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toStrictEqual(200);

    const result = await prisma.wallet.findUnique({
      where: {
        id: wallet.id,
      },
    });

    expect(result).toBeNull();
  });

  afterAll(async () => {
    await app.close();
  });
});
