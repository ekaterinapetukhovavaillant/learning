import { INestApplication } from '@nestjs/common';
import { createTestApp } from '../create-test-app';
import { CreateUserDto } from '../../src/user/dto/create-user.dto';
import { CreateUserService } from '../../src/user/service/create-user.service';
import { faker } from '@faker-js/faker';
import { LoginDto } from '../../src/auth/dto/login-dto';
import request from 'supertest';
import { User } from '@prisma/client';
import { getToken } from './user-utils';

describe('Sighing in and authentication of a user', () => {
  let app: INestApplication;
  let user: User;

  const userRegistrationData: CreateUserDto = {
    name: faker.person.fullName(),
    email: faker.internet.exampleEmail(),
    password: faker.internet.password(),
  };

  const userLoginData: LoginDto = {
    email: userRegistrationData.email,
    password: userRegistrationData.password,
  };

  beforeAll(async () => {
    app = await createTestApp();

    const createUserService = app.get(CreateUserService);

    user = await createUserService.execute(userRegistrationData);
  });

  it('It should sign in a new user successfully', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(userLoginData);

    expect(res.statusCode).toStrictEqual(201);
  });

  it('It should throw 404 error because email does not exist in the database', async () => {
    let incorrectEmail = faker.internet.exampleEmail();

    if (incorrectEmail === userRegistrationData.email)
      incorrectEmail = faker.internet.exampleEmail();

    const userLoginData: LoginDto = {
      email: incorrectEmail,
      password: userRegistrationData.password,
    };

    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(userLoginData);

    expect(res.statusCode).toStrictEqual(404);
  });

  it('It should throw 401 error because password is incorrect for current user', async () => {
    let incorrectPassword = faker.internet.password();

    if (incorrectPassword === userRegistrationData.password)
      incorrectPassword = faker.internet.password();

    const userLoginData: LoginDto = {
      email: userRegistrationData.email,
      password: incorrectPassword,
    };

    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(userLoginData);

    expect(res.statusCode).toStrictEqual(401);
  });

  it('It should get json with user data', async () => {
    const token = await getToken(app, userLoginData);
    const res = await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toStrictEqual(200);
    expect(res.body).toStrictEqual(
      expect.objectContaining({
        email: user.email,
        id: user.id,
        name: user.name,
      }),
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
