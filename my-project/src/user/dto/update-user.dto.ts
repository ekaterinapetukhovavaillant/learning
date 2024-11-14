import { CreateUserDto, createUserDtoSchema } from './create-user.dto';

export type UpdateUserDto = Partial<CreateUserDto>;
