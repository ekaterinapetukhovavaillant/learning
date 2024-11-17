import { INestApplication } from '@nestjs/common';
import { User } from '@prisma/client';
import { createTestApp } from './create-test-app';
import { PrismaService } from '../src/prisma/prisma.service';
import { faker } from '@faker-js/faker';
import request from 'supertest';

describe('Deleting a user', () => {
  let app: INestApplication;
  let testUser: User;
  let prisma: PrismaService;

  beforeAll(async () => {
    app = await createTestApp();
    prisma = app.get(PrismaService);

    testUser = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.exampleEmail(),
        password: faker.internet.password(),
      },
    });
  });

  it('Should delete a user', async () => {
    const response = await request(app.getHttpServer()).delete(
      `/user/${testUser.id}`,
    );

    expect(response.statusCode).toStrictEqual(200);

    const result = await prisma.user.findUnique({
      where: {
        id: testUser.id,
      },
    });

    expect(result).toBeNull();
  });

  afterAll(async () => {
    await app.close();
  });
});
