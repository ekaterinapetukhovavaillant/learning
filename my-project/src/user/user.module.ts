import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../../src/prisma/prisma.module';
import { CreateUserService } from './service/create-user.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, CreateUserService],
})
export class UserModule {}
