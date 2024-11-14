import { createTestApp } from './create-test-app';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as crypto from 'node:crypto';

describe('Creating a user', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create user', async () => {
    const prisma = app.get(PrismaService);

    const userData = {
      name: 'tef',
      email: `balbal${crypto.randomBytes(5).toString('hex')}@example.org`,
      password: 'asdfgwd',
    };

    const response = await request(app.getHttpServer())
      .post(`/user`)
      .send(userData);

    expect(response.statusCode).toStrictEqual(201);
    expect(response.body.id).toStrictEqual(expect.any(String)); // optional

    const userId = response.body.id;

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    expect(user.name).toStrictEqual(userData.name);
  });
});
