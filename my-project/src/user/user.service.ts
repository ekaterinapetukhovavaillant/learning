import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  public constructor(private readonly prisma: PrismaService) {}

  public async findOne(id: string): Promise<User> {
    return await this.prisma.user.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  }

  public remove(id: number): string {
    return `This action removes a #${id} user`;
  }
}
