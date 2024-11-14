import { createUserDtoSchema } from './create-user.dto';
import { z } from 'zod';

export const updateUserDtoSchema = z.optional(createUserDtoSchema);

export type UpdateUserDto = z.infer<typeof updateUserDtoSchema>;
