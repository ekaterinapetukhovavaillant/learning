import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Currency, User } from '@prisma/client';
import { WithdrawFundsFromWalletService } from './withdraw-funds-from-wallet.service';
import { AddFundsToWalletService } from './add-funds-to-wallet.service';

@Injectable()
export class ExchangeFundsService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly withdrawFundsFromWalletService: WithdrawFundsFromWalletService,
    private readonly addFundsToWalletService: AddFundsToWalletService,
  ) {}

  public async execute(
    user: User,
    currencyFrom: Currency,
    currencyTo: Currency,
    amount: number,
  ): Promise<void> {
    const exchangeCurrencies = await this.prisma.currenciesExchange.findFirst({
      where: {
        from: currencyFrom,
        to: currencyTo,
      },
    });

    if (!exchangeCurrencies)
      throw new NotFoundException('There is not such exchange currencies rate');

    await this.withdrawFundsFromWalletService.execute(
      user,
      currencyFrom,
      amount,
    );

    const amountAfterExchange = amount * exchangeCurrencies.rate.toNumber();

    await this.addFundsToWalletService.execute(
      user,
      currencyTo,
      amountAfterExchange,
    );
  }
}
