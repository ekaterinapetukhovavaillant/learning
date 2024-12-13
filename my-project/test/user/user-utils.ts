import { INestApplication } from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/login-dto';
import request from 'supertest';

export async function getToken(
  app: INestApplication,
  loginDto: LoginDto,
): Promise<string> {
  const res = await request(app.getHttpServer())
    .post('/auth/login')
    .send(loginDto);

  expect(res.statusCode).toStrictEqual(201);

  return res.body.token;
}
