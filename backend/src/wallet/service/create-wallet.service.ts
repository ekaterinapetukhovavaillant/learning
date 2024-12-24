import { Injectable } from '@nestjs/common';
import { User, Wallet } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ValidCurrency } from '../../validation/currency';

@Injectable()
export class CreateWalletService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(
    user: User,
    createWalletDto: ValidCurrency,
  ): Promise<Wallet> {
    return this.prisma.wallet.create({
      data: {
        ownerId: user.id,
        ...createWalletDto,
      },
    });
  }
}
