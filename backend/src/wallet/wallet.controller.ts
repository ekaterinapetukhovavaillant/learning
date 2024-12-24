import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Get,
} from '@nestjs/common';
import {
  validCurrencyObjectSchema,
  validCurrencyStringSchema,
} from '../validation/currency';
import { User, Wallet } from '@prisma/client';
import { CreateWalletService } from './service/create-wallet.service';
import { GetUser } from '../auth/user.decorator';
import { DeleteWalletService } from './service/delete-wallet.service';
import { AddFundsToWalletService } from './service/add-funds-to-wallet.service';
import { z } from 'zod';
import { WithdrawFundsFromWalletService } from './service/withdraw-funds-from-wallet.service';
import { GetAllWalletsService } from './service/get-all-wallets.service';
import { ExchangeFundsService } from './service/exchange-funds.service';

@Controller('wallet')
export class WalletController {
  public constructor(
    private readonly createWalletService: CreateWalletService,
    private readonly deleteWalletService: DeleteWalletService,
    private readonly addFundsToWalletService: AddFundsToWalletService,
    private readonly withdrawFundsFromWalletService: WithdrawFundsFromWalletService,
    private readonly getAllWalletsService: GetAllWalletsService,
    private readonly exchangeFundsService: ExchangeFundsService,
  ) {}

  @Get()
  public getAllWallets(@GetUser() user: User): Promise<Wallet[]> {
    return this.getAllWalletsService.execute(user);
  }

  @Post()
  public create(
    @Body() value: unknown,
    @GetUser() user: User,
  ): Promise<Wallet> {
    const createWalletDto = validCurrencyObjectSchema.parse(value);

    return this.createWalletService.execute(user, createWalletDto);
  }

  @Patch(':currency/add')
  public addFunds(
    @Param('currency') currency: string,
    @Body() value: unknown,
    @GetUser() user: User,
  ): Promise<Wallet> {
    const addFundsSchema = z.object({
      amount: z.number().positive(),
    });

    const validCurrency = validCurrencyStringSchema.parse(currency);

    const addedFunds = addFundsSchema.parse(value);

    const amount = addedFunds.amount;

    return this.addFundsToWalletService.execute(user, validCurrency, amount);
  }

  @Patch(':currency/withdraw')
  public withdrawFunds(
    @Param('currency') currency: string,
    @Body() value: unknown,
    @GetUser() user: User,
  ): Promise<Wallet> {
    const withdrawFundsSchema = z.object({
      amount: z.number().positive(),
    });

    const validCurrency = validCurrencyStringSchema.parse(currency);

    const withdrawedFunds = withdrawFundsSchema.parse(value);

    const amount = withdrawedFunds.amount;

    return this.withdrawFundsFromWalletService.execute(
      user,
      validCurrency,
      amount,
    );
  }

  @Delete(':id')
  public delete(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<Wallet> {
    return this.deleteWalletService.execute(id, user);
  }

  @Patch('exchange/:currencyFrom/:currencyTo')
  public exchangeFunds(
    @Param('currencyFrom') currencyFrom: string,
    @Param('currencyTo') currencyTo: string,
    @Body() value: unknown,
    @GetUser() user: User,
  ): Promise<void> {
    const exchangeFundsSchema = z.object({
      amount: z.number().positive(),
    });

    const validCurrencyFrom = validCurrencyStringSchema.parse(currencyFrom);
    const validCurrencyTo = validCurrencyStringSchema.parse(currencyTo);

    const exchangeFunds = exchangeFundsSchema.parse(value);

    const amount = exchangeFunds.amount;

    return this.exchangeFundsService.execute(
      user,
      validCurrencyFrom,
      validCurrencyTo,
      amount,
    );
  }
}
