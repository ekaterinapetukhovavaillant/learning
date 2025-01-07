import { z } from "zod";

const configSchema = z
  .object({
    VITE_BACKEND_API_URL: z.string().url(),
  })
  .transform((data) => {
    return {
      backendApiUrl: data.VITE_BACKEND_API_URL,
    };
  });

export type ConfigInterface = z.output<typeof configSchema>;

export const config = configSchema.parse(import.meta.env);
