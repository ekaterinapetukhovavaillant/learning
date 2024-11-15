import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
  public create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.createUserService.execute(createUserDto);
  }

  @Get()
  public findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.updateUserService.execute(id, updateUserDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
