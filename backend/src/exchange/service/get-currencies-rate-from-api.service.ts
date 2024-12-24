import { Injectable } from '@nestjs/common';
import { Currency } from '@prisma/client';
import { config } from '../../config';

@Injectable()
export class GetCurrenciesRateFromApiService {
  public async execute(from: Currency, to: Currency): Promise<string> {
    const response = await fetch(`${config.currenciesApiUrl}/${from}/${to}`);
    const data = await response.json();

    return data.rate;
  }
}
