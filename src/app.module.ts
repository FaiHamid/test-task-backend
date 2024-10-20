import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/userModules';
import { CustomMailerModule } from './modules/mailer.module';

@Module({
  imports: [DatabaseModule, UsersModule, CustomMailerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
