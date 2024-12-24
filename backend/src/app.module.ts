import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ZodValidationErrorFilter } from './exceptions/zod-vallidation-error.filter';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';
import { ExchangeModule } from './exchange/exchange.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, WalletModule, ExchangeModule],
  controllers: [],
  providers: [ZodValidationErrorFilter],
})
export class AppModule {}
