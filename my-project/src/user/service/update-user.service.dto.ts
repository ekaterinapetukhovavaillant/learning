import { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Injectable } from '@nestjs/common';
import { hashPassowrd } from '../../util/hashPassword';

@Injectable()
export class UpdateUserService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    if (updateUserDto.password)
      updateUserDto.password = await hashPassowrd(updateUserDto.password);

    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...updateUserDto,
      },
    });
  }
}
