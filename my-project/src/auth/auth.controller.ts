import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { GetUser } from './user.decorator';
import { User } from '@prisma/client';
import { GetMeDto } from './dto/get-me-dto';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

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
