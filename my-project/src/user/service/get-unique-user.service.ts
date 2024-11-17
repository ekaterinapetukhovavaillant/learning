import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GetUniqueUserService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(id: string): Promise<User> {
    return await this.prisma.user.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  }
}
