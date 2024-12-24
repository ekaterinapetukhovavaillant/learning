import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';
import { createUserDtoSchema } from './dto/create-user.dto';
import { updateUserDtoSchema } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { CreateUserService } from './service/create-user.service';
import { UpdateUserService } from './service/update-user.service';
import { GetAllUsersService } from './service/get-all-users.service';
import { GetUserByIdService } from './service/get-user-by-id.service';
import { DeleteUserService } from './service/delete-user.service';

@Controller('user')
export class UserController {
  public constructor(
    private readonly getAllUsersService: GetAllUsersService,
    private readonly getUserByIdService: GetUserByIdService,
    private readonly createUserService: CreateUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService,
  ) {}

  @Post()
  public create(@Body() value: unknown): Promise<User> {
    const createUserDto = createUserDtoSchema.parse(value);

    return this.createUserService.execute(createUserDto);
  }

  @Get()
  public findAll(): Promise<User[]> {
    return this.getAllUsersService.execute();
  }

  @Get(':id')
  public findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.getUserByIdService.execute(id);
  }

  @Patch(':id')
  public update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() value: unknown,
  ): Promise<User> {
    const updateUserDto = updateUserDtoSchema.parse(value);

    return this.updateUserService.execute(id, updateUserDto);
  }

  @Delete(':id')
  public remove(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.deleteUserService.execute(id);
  }
}
