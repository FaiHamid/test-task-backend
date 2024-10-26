import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/userModules';
import { CustomMailerModule } from './modules/mailer.module';
import { AuthModule } from './auth/auth.module';
import { CookiesModule } from './middleware/cookie.middleware';
import { sessionsProviders } from './session/session.provider';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    CustomMailerModule,
    AuthModule,
    CookiesModule,
  ],
  controllers: [AppController],
  providers: [AppService, ...sessionsProviders],
})
export class AppModule {}
