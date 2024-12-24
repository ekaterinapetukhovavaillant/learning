import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User, Wallet } from '@prisma/client';

@Injectable()
export class GetAllWalletsService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(user: User): Promise<Wallet[]> {
    return await this.prisma.wallet.findMany({
      where: {
        ownerId: user.id,
      },
    });
  }
}
