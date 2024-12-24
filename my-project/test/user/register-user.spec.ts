import { faker } from '@faker-js/faker/.';
import { CreateUserDto } from '../../src/user/dto/create-user.dto';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from '../create-test-app';
import request from 'supertest';

describe('Registration of a new user', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  it('Should create a new user', async () => {
    const userData: CreateUserDto = {
      name: faker.person.fullName(),
      email: faker.internet.exampleEmail(),
      password: faker.internet.password(),
    };

    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send(userData);

    expect(res.statusCode).toStrictEqual(201);
  });

  it('Should not create a new user with email, which already is in database', async () => {
    const email = faker.internet.exampleEmail();

    const userDataWithUniqueEmail: CreateUserDto = {
      name: faker.person.fullName(),
      email: email,
      password: faker.internet.password(),
    };

    await request(app.getHttpServer())
      .post('/auth/register')
      .send(userDataWithUniqueEmail);

    const userDataWithNotUniqueEmail: CreateUserDto = {
      name: faker.person.fullName(),
      email: email,
      password: faker.internet.password(),
    };

    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send(userDataWithNotUniqueEmail);

    expect(res.statusCode).toStrictEqual(409);
  });

  afterAll(async () => {
    await app.close();
  });
});
