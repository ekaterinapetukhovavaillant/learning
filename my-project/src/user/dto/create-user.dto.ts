import { isEmail, isString } from 'class-validator';

export class CreateUserDto {
  name: string;

  email: string;

  password: string;
}
