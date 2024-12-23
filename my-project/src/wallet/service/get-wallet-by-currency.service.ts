import { Injectable, NotFoundException } from '@nestjs/common';
import { Currency, Wallet } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GetWalletByCurrencyService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(userId: string, currency: Currency): Promise<Wallet> {
    const wallet = await this.prisma.wallet.findFirst({
      where: {
        ownerId: userId,
        currency,
      },
    });

    if (!wallet)
      throw new NotFoundException("You don't have wallet in this currency");

    return wallet;
  }
}
