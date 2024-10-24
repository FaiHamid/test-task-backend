import {
  Controller,
  Get,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { ERole } from 'src/types/roles.enum';
import { UserService } from 'src/users/user.service';
import { CompaniesService } from './companies.service';

@Controller()
export class CompaniesController {
  constructor(
    private userService: UserService,
    private companiesService: CompaniesService,
  ) {}

  @Get('companies')
  async getAllCompanies(@Request() req) {
    const user = await this.userService.getUserWithRole(req.user.id);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const role = user.role.role;

    if (role === ERole.Super_Admin) {
      return this.companiesService.getAllCompanies();
    }

    if (role === ERole.Admin) {
      return this.companiesService.getAdminCompanies(user.id);
    }

    if (role === ERole.User) {
      return this.companiesService.getUserCompanies(user.id);
    }

    throw new UnauthorizedException(
      'You do not have permission to access this resource',
    );
  }

  @Get('companies/:idCompany')
  async getCompany() {}
}
