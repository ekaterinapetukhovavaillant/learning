import { z } from 'zod';

const configSchema = z
  .object({
    SECRET_KEY: z.string().min(1),
    CURRENCIES_API_URL: z.string().url(),
  })
  .transform((data) => {
    return {
      secretKey: data.SECRET_KEY,
      currenciesApiUrl: data.CURRENCIES_API_URL,
    };
  });

export type ConfigInterface = z.output<typeof configSchema>;

// eslint-disable-next-line no-process-env
export const config = configSchema.parse(process.env);
