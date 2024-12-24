import { Currency } from '@prisma/client';
import { z } from 'zod';

export const validCurrencyObjectSchema = z.object({
  currency: z.nativeEnum(Currency),
});

export const validCurrencyStringSchema =
  validCurrencyObjectSchema.shape.currency;

export type ValidCurrency = z.output<typeof validCurrencyObjectSchema>;
