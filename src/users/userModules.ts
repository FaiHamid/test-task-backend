import { Module } from '@nestjs/common';
import { usersProviders } from './users.provider';
import { DatabaseModule } from 'src/database/database.module';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [...usersProviders, UserService],
})
export class UsersModule {}
