import { INestApplication } from '@nestjs/common';
import { createTestApp } from './create-test-app';
import { PrismaService } from '../src/prisma/prisma.service';
import { UpdateUserDto } from '../src/user/dto/update-user.dto';
import { faker } from '@faker-js/faker';
import request from 'supertest';
import { User } from '@prisma/client';
import * as brcypt from 'bcrypt';

describe('Updating a user', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let testUser: User;

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

  it('should update user name', async () => {
    const userNameData: UpdateUserDto = {
      name: faker.person.fullName(),
    };

    const response = await request(app.getHttpServer())
      .patch(`/user/${testUser.id}`)
      .send(userNameData);

    expect(response.statusCode).toStrictEqual(200);

    const exsistingTestUser = await prisma.user.findUniqueOrThrow({
      where: {
        id: testUser.id,
      },
    });

    expect(exsistingTestUser.name).toStrictEqual(userNameData.name);
  });

  it('should update user email', async () => {
    const userEmailData: UpdateUserDto = {
      email: faker.internet.exampleEmail(),
    };

    const response = await request(app.getHttpServer())
      .patch(`/user/${testUser.id}`)
      .send(userEmailData);

    expect(response.statusCode).toStrictEqual(200);

    const exsistingTestUser = await prisma.user.findUniqueOrThrow({
      where: {
        id: testUser.id,
      },
    });

    expect(exsistingTestUser.email).toStrictEqual(userEmailData.email);
  });

  it('should update user password', async () => {
    const userPasswordData: UpdateUserDto = {
      password: faker.internet.password(),
    };

    const response = await request(app.getHttpServer())
      .patch(`/user/${testUser.id}`)
      .send(userPasswordData);

    expect(response.statusCode).toStrictEqual(200);

    const exsistingTestUser = await prisma.user.findUniqueOrThrow({
      where: {
        id: testUser.id,
      },
    });

    const match = brcypt.compare(
      userPasswordData.password!,
      exsistingTestUser.password,
    );

    expect(match).toBeTruthy();
  });

  afterAll(async () => {
    await app.close();
  });
});
