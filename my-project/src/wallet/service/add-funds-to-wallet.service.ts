import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { Prisma, User, Wallet } from '@prisma/client';
import { GetWalletByCurrencyService } from './get-wallet-by-currency.service';

@Injectable()
export class AddFundsToWalletService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly getWalletByCurrencyService: GetWalletByCurrencyService,
  ) {}

  //   user gives currency and fund
  //   find needed wallet by currency
  //   update fund
  public async execute(
    user: User,
    currency: string,
    addedAmount: number,
  ): Promise<Wallet> {
    const wallet = await this.getWalletByCurrencyService.execute(
      user.id,
      currency,
    );
    const updatedAmount = wallet.amount.toNumber() + addedAmount;

    return await this.prisma.wallet.update({
      where: {
        id: wallet.id,
      },
      data: {
        amount: new Prisma.Decimal(updatedAmount),
      },
    });
  }
}
