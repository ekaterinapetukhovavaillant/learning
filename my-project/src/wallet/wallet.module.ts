import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { PrismaModule } from '../../src/prisma/prisma.module';
import { AuthMiddleware } from '../../src/middleware/auth.middleware';
import { CreateWalletService } from './service/create-wallet.service';
import { DeleteWalletService } from './service/delete-wallet.service';

@Module({
  controllers: [WalletController],
  providers: [CreateWalletService, DeleteWalletService],
  imports: [PrismaModule],
})
export class WalletModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes(WalletController);
  }
}
