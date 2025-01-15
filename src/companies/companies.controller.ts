import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ERole } from 'src/types/roles.enum';
import { UserService } from 'src/users/user.service';
import { CompaniesService } from './companies.service';
import { CompaniesDtoWithPrice } from './dto/create-company.dto';
import { JwtAuthGuard } from 'src/middleware/jwt-auth.guard';

@Controller('companies')
export class CompaniesController {
  constructor(
    private userService: UserService,
    private companiesService: CompaniesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
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

  @Get(':idCompany')
  async getCompany() {}

  @Post()
  async addCompany(@Body() companiesDto: CompaniesDtoWithPrice) {
    await this.companiesService.addNewCompany(companiesDto);
  }
}
