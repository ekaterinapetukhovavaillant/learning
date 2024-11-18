import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login-dto';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('login')
  public login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
