import { Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/payment')
  paymentTicket() {
    return this.appService.demoPayment();
  }

  @Post('/subscription')
  registerSubscription() {
    return this.appService.newSubscription();
  }
}
