import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RedisCacheModule } from './redis.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RedisCacheModule,
    {
      transport: Transport.TCP,
      // options: {
      //   port: 3001,
      // }
    },
  );
  app.listen();
}
bootstrap();
