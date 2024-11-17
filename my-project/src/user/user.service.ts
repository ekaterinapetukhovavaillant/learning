import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  public constructor(private readonly prisma: PrismaService) {}

  public remove(id: number): string {
    return `This action removes a #${id} user`;
  }
}
