import { Inject, Injectable } from '@nestjs/common';
import { Company } from 'src/models/companies.entity';
import { CompaniesDto } from './dto/create-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @Inject('COMPANIES_REPOSITORY') private userRepository: typeof Company,
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

  async addNewCompany(newCompanyData: CompaniesDto) {
    try {
      return newCompanyData;
    } catch {}
  }
}
