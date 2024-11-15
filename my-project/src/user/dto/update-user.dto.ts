import { createUserDtoSchema } from './create-user.dto';
import { z } from 'zod';

export const updateUserDtoSchema = createUserDtoSchema.partial();

export type UpdateUserDto = z.output<typeof updateUserDtoSchema>;
