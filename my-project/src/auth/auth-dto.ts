import { z } from 'zod';

export const authDto = z.object({
  email: z.string().trim().email(),
  password: z.string(),
});

export type AuthDto = z.infer<typeof authDto>;
