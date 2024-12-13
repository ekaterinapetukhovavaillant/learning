import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { createWalletDtoSchema } from './dto/create-wallet.dto';
import { User, Wallet } from '@prisma/client';
import { CreateWalletService } from './service/create-wallet.service';
import { GetUser } from '../../src/auth/user.decorator';
import { DeleteWalletService } from './service/delete-wallet.service';

@Controller('wallet')
export class WalletController {
  public constructor(
    private readonly createWalletService: CreateWalletService,
    private readonly deleteWalletService: DeleteWalletService,
  ) {}

  @Post()
  public create(
    @Body() value: unknown,
    @GetUser() user: User,
  ): Promise<Wallet> {
    const createWalletDto = createWalletDtoSchema.parse(value);

    return this.createWalletService.execute(user, createWalletDto);
  }

  @Delete(':id')
  public delete(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<Wallet> {
    return this.deleteWalletService.execute(id, user);
  }
}
