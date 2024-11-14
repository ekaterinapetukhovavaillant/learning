import { z } from 'zod';

export const createUserDtoSchema = z.object({
  name: z.string().trim(),
  email: z.string().trim().email(),
  password: z.string().min(8).max(20),
});

export type CreateUserDto = z.infer<typeof createUserDtoSchema>;
