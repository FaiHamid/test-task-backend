export class CompaniesDtoWithPrice {
  name: string;
  capital: number;
  service: string;
  latitude?: string;
  longitude?: string;
  idUser: number;
  logotype?: string;
  price: number;
}

export type CompaniesDto = Omit<CompaniesDtoWithPrice, 'price'>;
