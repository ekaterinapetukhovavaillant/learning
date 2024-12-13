import { z } from 'zod';

export const validCurrencyObjectSchema = z.object({
  currency: z.string().length(3),
});

export const validCurrencyStringSchema =
  validCurrencyObjectSchema.shape.currency;

export type ValidCurrency = z.output<typeof validCurrencyObjectSchema>;
