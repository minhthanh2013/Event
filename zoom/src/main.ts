import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import {  ZoomModule } from './zoom.module';

async function bootstrap() {
  const app = await NestFactory.create(ZoomModule);
  app.enableCors();
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      // host: 'zoom',
      port: 3001,
    },
  });
  await app.startAllMicroservices();
  await app.listen(4001);
}
bootstrap();