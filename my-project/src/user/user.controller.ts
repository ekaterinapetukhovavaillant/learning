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
import { UserService } from './user.service';
import { createUserDtoSchema } from './dto/create-user.dto';
import { updateUserDtoSchema } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { CreateUserService } from './service/create-user.service';
import { UpdateUserService } from './service/update-user.service.dto';

@Controller('user')
export class UserController {
  public constructor(
    private readonly userService: UserService,
    private readonly createUserService: CreateUserService,
    private readonly updateUserService: UpdateUserService,
  ) {}

  @Post()
  public create(@Body() value: unknown): Promise<User> {
    const createUserDto = createUserDtoSchema.parse(value);

    return this.createUserService.execute(createUserDto);
  }

  @Get()
  public findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
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
  public remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
