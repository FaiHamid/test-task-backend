import { PriceHistory } from 'src/models/price_history.entity';

export const priceHistoryProviders = [
  {
    provide: 'PRICE_HISTORY_REPOSITORY',
    useValue: PriceHistory,
  },
];
