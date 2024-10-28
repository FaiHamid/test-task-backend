import { Inject, Injectable } from '@nestjs/common';
import { Company } from 'src/models/companies.entity';
import { CompaniesDtoWithPrice } from './dto/create-company.dto';
import { UserRegistrationException } from 'src/services/exception.service';
import { PriceHistory } from 'src/models/price_history.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @Inject('COMPANIES_REPOSITORY') private companiesRepository: typeof Company,
    @Inject('PRICE_HISTORY_REPOSITORY')
    private priceHistoryRepository: typeof PriceHistory,
  ) {}

  async getAllCompanies() {
    try {
    } catch {}
  }

  async getAdminCompanies(adminId: number) {
    try {
      return adminId;
    } catch {}
  }

  async getUserCompanies(userId: number) {
    try {
      return userId;
    } catch {}
  }

  async addNewCompany(newCompanyData: CompaniesDtoWithPrice) {
    try {
      const { price, ...companyData } = newCompanyData;

      const createdCompany = await this.companiesRepository.create(companyData);
      await this.priceHistoryRepository.create({
        companyid: createdCompany.id,
        price,
      });

      return createdCompany;
    } catch {
      throw new UserRegistrationException('Something went wrong');
    }
  }
}
