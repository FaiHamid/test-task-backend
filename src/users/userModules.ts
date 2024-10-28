import { Module } from '@nestjs/common';
import { usersProviders } from '../providers/users.provider';
import { DatabaseModule } from 'src/database/database.module';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './user.controller';
import { CustomJwtService } from 'src/services/jwt.services';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [UserController],
  providers: [...usersProviders, UserService, CustomJwtService],
})
export class UsersModule {}
