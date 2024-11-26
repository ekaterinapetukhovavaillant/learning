import { z } from 'zod';

export const createWalletDtoSchema = z.object({
  currency: z.string().min(3),
});

export type CreateWalletDto = z.infer<typeof createWalletDtoSchema>;
