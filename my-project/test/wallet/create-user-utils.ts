import { faker } from '@faker-js/faker/.';
import { INestApplication } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserService } from '../../src/user/service/create-user.service';
import { getToken } from '../../test/user/user-utils';

type CreateUserAndToken = {
  token: string;
  user: User;
};

export async function createUserAndToken(
  app: INestApplication,
): Promise<CreateUserAndToken> {
  const createUserService = app.get(CreateUserService);

  const userData = {
    name: faker.person.fullName(),
    email: faker.internet.exampleEmail(),
    password: faker.internet.password(),
  };

  const user = await createUserService.execute(userData);

  const token = await getToken(app, {
    email: userData.email,
    password: userData.password,
  });

  return { token, user };
}
