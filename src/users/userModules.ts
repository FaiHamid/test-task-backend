import { Module } from '@nestjs/common';
import { RegisterController } from '../auth/register.controller';
import { AuthService } from '../auth/auth.service';
import { usersProviders } from './users.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RegisterController],
  providers: [AuthService, ...usersProviders],
})
export class UsersModule {}
