import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { hashPassowrd } from '../../util/hashPassword';
import { GetUserByEmailService } from './get-user-by-email.service';

@Injectable()
export class CreateUserService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly getUserByEmailService: GetUserByEmailService,
  ) {}

  public async execute(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.getUserByEmailService.execute(
      createUserDto.email,
    );

    if (existingUser)
      throw new ConflictException('User with such email already exsist');

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
