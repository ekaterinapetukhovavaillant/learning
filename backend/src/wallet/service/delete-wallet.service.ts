import { Injectable } from '@nestjs/common';
import { User, Wallet } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DeleteWalletService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(id: string, user: User): Promise<Wallet> {
    const wallet = await this.prisma.wallet.findUniqueOrThrow({
      where: {
        id,
        ownerId: user.id,
      },
    });

    if (!wallet.amount.isZero()) {
      throw new Error('Wallet amount must be zero to be deleted');
    }

    return await this.prisma.wallet.delete({
      where: {
        id,
      },
    });
  }
}
