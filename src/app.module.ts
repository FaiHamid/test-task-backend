import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/userModules';
import { CustomMailerModule } from './modules/mailer.module';
import { AuthModule } from './auth/auth.module';
import { CookieMiddleware } from './middleware/cookie.middleware';
import { sessionsProviders } from './session/session.provider';

@Module({
  imports: [DatabaseModule, UsersModule, CustomMailerModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, ...sessionsProviders],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieMiddleware).forRoutes('*');
  }
}
