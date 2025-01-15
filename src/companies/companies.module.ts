import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { companiesProviders } from '../providers/companies.provider';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { JwtStrategy } from 'src/middleware/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [CompaniesController],
  providers: [...companiesProviders, CompaniesService, JwtStrategy],
})
export class CompaniesModule {}
