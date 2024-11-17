import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../../src/prisma/prisma.module';
import { CreateUserService } from './service/create-user.service';
import { UpdateUserService } from './service/update-user.service';
import { GetAllUsersService } from './service/get-all-users.service';
import { GetUniqueUserService } from './service/get-unique-user.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    UserService,
    GetAllUsersService,
    GetUniqueUserService,
    CreateUserService,
    UpdateUserService,
  ],
})
export class UserModule {}
