import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from '../auth/auth.service';
import { ActivateController } from 'src/controllers/activate.controller';
import { rolesProviders } from 'src/roles/roles.provider';
import { MailService } from 'src/services/mail.service';
import { LocalStrategy } from './local.strategy';
import { UserService } from 'src/users/user.service';
import { usersProviders } from 'src/users/users.provider';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CustomJwtService } from 'src/services/jwt.services';
import { sessionsProviders } from 'src/session/session.provider';
import { JwtAuthGuard } from '../middleware/auth.middleware';
import * as dotenv from 'dotenv';
import { TokensService } from 'src/services/tokens.service';

dotenv.config();

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [AuthController, ActivateController],
  providers: [
    ...usersProviders,
    ...rolesProviders,
    ...sessionsProviders,
    AuthService,
    UserService,
    MailService,
    LocalStrategy,
    CustomJwtService,
    JwtAuthGuard,
    TokensService,
  ],
})
export class AuthModule {}
