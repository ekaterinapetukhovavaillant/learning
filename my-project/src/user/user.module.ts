import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../../src/prisma/prisma.module';
import { CreateUserService } from './service/create-user.service';
import { UpdateUserService } from './service/update-user.service';
import { GetAllUsersService } from './service/get-all-users.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    UserService,
    GetAllUsersService,
    CreateUserService,
    UpdateUserService,
  ],
})
export class UserModule {}
