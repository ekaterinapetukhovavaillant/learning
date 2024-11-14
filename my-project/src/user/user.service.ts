import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  private constructor(private readonly prisma: PrismaService) {}
  public async create(createUserDto: CreateUserDto): Promise<User> {
    const hash = await this.hashPassowrd(createUserDto.password);
    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hash,
      },
    });

    return user;
  }

  public async findAll() {
    return await this.prisma.user.findMany();
  }

  public findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  public update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  public remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private async hashPassowrd(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }
}
