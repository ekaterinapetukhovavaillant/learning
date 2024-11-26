import { Injectable } from '@nestjs/common';
import { Wallet } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWalletDto } from '../dto/create-wallet.dto';

@Injectable()
export class CreateWalletService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(createWalletDto: CreateWalletDto): Promise<Wallet> {
    const walletData: CreateWalletDto = {
      currency: createWalletDto.currency,
    };

    return this.prisma.wallet.create({
      data: walletData,
    });
  }
}
