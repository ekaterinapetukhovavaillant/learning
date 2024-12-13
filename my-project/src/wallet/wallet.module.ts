import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { PrismaModule } from '../../src/prisma/prisma.module';
import { AuthMiddleware } from '../../src/middleware/auth.middleware';
import { CreateWalletService } from './service/create-wallet.service';
import { DeleteWalletService } from './service/delete-wallet.service';
import { AddFundsToWalletService } from './service/add-funds-to-wallet.service';
import { GetWalletByCurrencyService } from './service/get-wallet-by-currency.service';
import { WithdrawFundsFromWalletService } from './service/withdraw-funds-from-wallet.service';

@Module({
  controllers: [WalletController],
  providers: [
    CreateWalletService,
    DeleteWalletService,
    AddFundsToWalletService,
    WithdrawFundsFromWalletService,
    GetWalletByCurrencyService,
  ],
  imports: [PrismaModule],
})
export class WalletModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes(WalletController);
  }
}
