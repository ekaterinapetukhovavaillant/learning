import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { LoginDto } from './dto/login-dto';
import { GetUser } from './user.decorator';
import { User } from '@prisma/client';
import { GetMeDto } from './dto/get-me-dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { RegisterService } from './service/register.service';

@Controller('auth')
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
    private readonly registerService: RegisterService,
  ) {}

  @Post('register')
  public register(@Body() registerDto: CreateUserDto): Promise<void> {
    return this.registerService.register(registerDto);
  }

  @Post('login')
  public login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Get('me')
  public getMe(@GetUser() user: User): GetMeDto {
    const me: GetMeDto = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return me;
  }
}
