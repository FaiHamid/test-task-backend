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
      return await this.companiesRepository.findAll();
    } catch {}
  }

  async getAdminCompanies(adminId: number) {
    try {
      return await this.companiesRepository.findAll({
        where: { idUser: adminId },
      });
    } catch {}
  }

  async getUserCompanies(userId: number) {
    try {
      const resp = await this.companiesRepository.findAll({
        where: { idUser: userId },
      });

      return resp;
    } catch (error) {
      console.log('error', error);
    }
  }

  async addNewCompany(newCompanyData: CompaniesDtoWithPrice) {
    try {
      const { price, ...companyData } = newCompanyData;
      console.log('adding company');
      const createdCompany = await this.companiesRepository.create(companyData);
      console.log('createdCompany', createdCompany.id);
      const resp = await this.priceHistoryRepository.create({
        companyId: createdCompany.id,
        price,
      });
      console.log('add price', resp);
      return createdCompany;
    } catch (error) {
      console.log('error', error);
      throw new UserRegistrationException('Something went wrong');
    }
  }
}
