import { Injectable } from '@nestjs/common';
import { CreateUserService } from '../../user/service/create-user.service';
import { CreateUserDto } from '../../user/dto/create-user.dto';

@Injectable()
export class RegisterService {
  public constructor(private readonly createUserService: CreateUserService) {}

  public async register(registerDto: CreateUserDto): Promise<void> {
    await this.createUserService.execute(registerDto);
  }
}
