import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'auth/me', method: RequestMethod.GET });
  }
}
