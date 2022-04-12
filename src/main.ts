import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import * as Next from 'next';
import { AppModule } from './backend/app.module';
async function bootstrap() {

  const server = await NestFactory.create(AppModule);
  server.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  await server.listen(3333);
}
bootstrap();
