import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ZodValidationErrorFilter } from './exceptions/zod-vallidation-error.filter';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, WalletModule],
  controllers: [],
  providers: [ZodValidationErrorFilter],
})
export class AppModule {}
