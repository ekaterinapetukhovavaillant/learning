import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaModule } from '../../src/prisma/prisma.module';
import { CreateUserService } from './service/create-user.service';
import { UpdateUserService } from './service/update-user.service';
import { GetAllUsersService } from './service/get-all-users.service';
import { GetUniqueUserService } from './service/get-unique-user.service';
import { DeleteUserService } from './service/delete-user.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    GetAllUsersService,
    GetUniqueUserService,
    CreateUserService,
    UpdateUserService,
    DeleteUserService,
  ],
})
export class UserModule {}
