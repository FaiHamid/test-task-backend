import { Injectable } from '@nestjs/common';

@Injectable()
export class CompaniesService {
  constructor() {}

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
}
