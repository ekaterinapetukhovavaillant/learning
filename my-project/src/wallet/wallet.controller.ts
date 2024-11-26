import { Controller, Post, Body } from '@nestjs/common';
import { createWalletDtoSchema } from './dto/create-wallet.dto';
import { Wallet } from '@prisma/client';
import { CreateWalletService } from './service/create-wallet.service';

@Controller('wallet')
export class WalletController {
  public constructor(
    private readonly createWalletService: CreateWalletService,
  ) {}

  @Post()
  public create(@Body() value: unknown): Promise<Wallet> {
    const createWalletDto = createWalletDtoSchema.parse(value);

    return this.createWalletService.execute(createWalletDto);
  }
}
