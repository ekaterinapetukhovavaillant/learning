import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ZodValidationErrorFilter } from './exceptions/zod-vallidation-error.filter';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [],
  providers: [ZodValidationErrorFilter],
})
export class AppModule {}
