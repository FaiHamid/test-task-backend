import { Module } from '@nestjs/common';
import { RegisterController } from '../auth/register.controller';
import { AuthService } from '../auth/auth.service';
import { usersProviders } from './users.provider';
import { DatabaseModule } from 'src/database/database.module';
import { UserService } from './user.service';
import { ActivateController } from 'src/auth/activate.controller';
import { rolesProviders } from 'src/roles/roles.provider';
import { MailService } from 'src/services/mail.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RegisterController, ActivateController],
  providers: [AuthService, ...usersProviders, UserService, ...rolesProviders, MailService],
})
export class UsersModule {}
