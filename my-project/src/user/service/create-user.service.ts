import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class CreateUserService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(createUserDto: CreateUserDto): Promise<User> {
    const hash = await this.hashPassowrd(createUserDto.password);
    const userData: CreateUserDto = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: hash,
    };

    return await this.prisma.user.create({
      data: userData,
    });
  }

  private async hashPassowrd(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }
}
