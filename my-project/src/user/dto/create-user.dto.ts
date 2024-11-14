// import { isEmail, isString } from 'class-validator';

// export class CreateUserDto {
//   name: string;
//
//   email: string;
//
//   password: string;
// }

import { z } from 'zod';

export const createUserDtoSchema = z.object({
  name: z.string().min(3).max(60),
  email: z.string().email().max(100),
  password: z.string().min(6).max(100), // add safety
});

export type CreateUserDto = z.output<typeof createUserDtoSchema>;
