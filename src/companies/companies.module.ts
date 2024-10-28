import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { companiesProviders } from '../providers/companies.provider';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CompaniesController],
  providers: [...companiesProviders, CompaniesService],
})
export class CompaniesModule {}
