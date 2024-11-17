import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  public constructor(private readonly prisma: PrismaService) {}

  public async findAll() {
    return await this.prisma.user.findMany();
  }

  public async findOne(id: string) {
    return await this.prisma.user.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  }

  public remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
