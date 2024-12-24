import { Injectable } from '@nestjs/common';
import { Currency, Prisma, User, Wallet } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { GetWalletByCurrencyService } from './get-wallet-by-currency.service';

@Injectable()
export class WithdrawFundsFromWalletService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly getWalletByCurrencyService: GetWalletByCurrencyService,
  ) {}

  public async execute(
    user: User,
    currency: Currency,
    diffAmount: number,
  ): Promise<Wallet> {
    const wallet = await this.getWalletByCurrencyService.execute(
      user.id,
      currency,
    );

    const currentAmount = wallet.amount.toNumber();

    if (diffAmount > currentAmount) {
      throw new Error(
        'The amount of withdrawn funds is greater than the amount in the wallet',
      );
    }

    const updatedAmount = wallet.amount.toNumber() - diffAmount;

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
