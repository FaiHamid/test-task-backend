import { Company } from '../models/companies.entity';

export const companiesProviders = [
  {
    provide: 'COMPANIES_REPOSITORY',
    useValue: Company,
  },
];
