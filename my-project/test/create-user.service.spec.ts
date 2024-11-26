import { createTestApp } from './create-test-app';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { CreateUserDto } from '../src/user/dto/create-user.dto';
import request from 'supertest';

describe('Creating a user', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  it('should create a user', async () => {
    const prisma = app.get(PrismaService);

    const userData: CreateUserDto = {
      name: faker.person.fullName(),
      email: faker.internet.exampleEmail(),
      password: faker.internet.password(),
    };

    const response = await request(app.getHttpServer())
      .post('/user')
      .send(userData);

    expect(response.statusCode).toStrictEqual(201);

    const userId = await response.body.id;

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    expect(user.name).toStrictEqual(userData.name);
    expect(user.email).toStrictEqual(userData.email);
  });

  afterAll(async () => {
    await app.close();
  });
});
