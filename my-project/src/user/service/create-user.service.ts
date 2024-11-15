import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { hashPassowrd } from '../../util/hashPassword';

@Injectable()
export class CreateUserService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(createUserDto: CreateUserDto): Promise<User> {
    const hash = await hashPassowrd(createUserDto.password);
    const userData: CreateUserDto = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: hash,
    };

    return await this.prisma.user.create({
      data: userData,
    });
  }
}
