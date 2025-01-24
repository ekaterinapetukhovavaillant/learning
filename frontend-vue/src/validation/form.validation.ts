import z from "zod";

export const validRegistrationFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "Must be 8 or more characters long" })
    .max(20, { message: "Must be 20 or fewer characters long" }),
});

export type ValidUser = z.output<typeof validRegistrationFormSchema>;

export const validLoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type ValidLogin = z.output<typeof validLoginFormSchema>;
