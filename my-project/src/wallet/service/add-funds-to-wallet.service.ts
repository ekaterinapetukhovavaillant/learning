import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Currency, Prisma, User, Wallet } from '@prisma/client';
import { GetWalletByCurrencyService } from './get-wallet-by-currency.service';
@Injectable()
export class AddFundsToWalletService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly getWalletByCurrencyService: GetWalletByCurrencyService,
  ) {}
  public async execute(
    user: User,
    currency: Currency,
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
