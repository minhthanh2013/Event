import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StripeModule } from 'nestjs-stripe';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }
    ),
    StripeModule.forRoot({
      apiKey: process.env.STRIPE_KEY,
      apiVersion: '2020-08-27'
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
