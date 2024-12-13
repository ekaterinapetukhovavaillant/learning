import { Injectable } from '@nestjs/common';
import { User, Wallet } from '@prisma/client';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { CreateWalletDto } from '../dto/create-wallet.dto';

@Injectable()
export class CreateWalletService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(
    user: User,
    createWalletDto: CreateWalletDto,
  ): Promise<Wallet> {
    return this.prisma.wallet.create({
      data: {
        ownerId: user.id,
        ...createWalletDto,
      },
    });
  }
}
