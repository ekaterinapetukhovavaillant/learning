import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GetUserByEmailService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(email: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }
}
