import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GetUserByEmailService } from '../../user/service/get-user-by-email.service';
import Jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { config } from '../../config';

@Injectable()
export class AuthService {
  public constructor(
    private readonly getUserByEmailService: GetUserByEmailService,
  ) {}

  public async login(email: string, pass: string): Promise<{ token: string }> {
    const user = await this.getUserByEmailService.execute(email);

    if (!user)
      throw new UnauthorizedException({
        errorMessage: 'Incorrect email or password',
      });

    const match = await bcrypt.compare(pass, user.password);

    if (!match)
      throw new UnauthorizedException({
        errorMessage: 'Incorrect email or password',
      });

    const payload = {
      id: user.id,
    };

    const token = Jwt.sign(payload, config.secretKey, {
      expiresIn: '7d',
    });

    return { token };
  }
}
