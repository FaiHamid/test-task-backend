import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';

dotenv.config();

const PORT = process.env.PORT || 8000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  });
  app.use(json({ limit: '500kb' }));
  app.use(urlencoded({ extended: true, limit: '500kb' }));
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API description for your project')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}

bootstrap();
