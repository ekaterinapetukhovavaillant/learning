import { z } from 'zod';

const configSchema = z
  .object({
    SECRET_KEY: z.string().min(1),
  })
  .transform((data) => {
    return {
      secretKey: data.SECRET_KEY,
    };
  });

export type ConfigInterface = z.output<typeof configSchema>;

// eslint-disable-next-line no-process-env
export const config = configSchema.parse(process.env);
