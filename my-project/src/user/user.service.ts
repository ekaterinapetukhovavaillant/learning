import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  public constructor(private readonly prisma: PrismaService) {}
  // public async create(createUserDto: CreateUserDto): Promise<User> {
  //   const hash = await this.hashPassowrd(createUserDto.password);
  //   const user = await this.prisma.user.create({
  //     data: {
  //       name: createUserDto.name,
  //       email: createUserDto.email,
  //       password: hash,
  //     },
  //   });

  //   return user;
  // }

  public async findAll() {
    return await this.prisma.user.findMany();
  }

  public findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(id: number, _updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  public remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
