import { Injectable, NotFoundException } from '@nestjs/common';
import { Wallet } from '@prisma/client';
import { PrismaService } from '../../../src/prisma/prisma.service';

@Injectable()
export class GetWalletByCurrencyService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(userId: string, currency: string): Promise<Wallet> {
    const wallet = await this.prisma.wallet.findFirst({
      where: {
        ownerId: userId,
        currency,
      },
    });

    if (!wallet) throw new NotFoundException();

    return wallet;
  }
}
