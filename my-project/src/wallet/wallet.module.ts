import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [WalletController],
  providers: [],
  imports: [PrismaModule],
})
export class WalletModule {}
