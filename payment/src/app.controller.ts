import { Controller, Get, Inject, Post } from '@nestjs/common';
import { EventPattern, MessagePattern, Transport } from '@nestjs/microservices';
import { from, Observable, of } from 'rxjs';
import { AppService } from './app.service';
import { PaymentDto } from './payment/payment.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({cmd: 'CHECKOUT'})
  ticketPayment(dataPayment: PaymentDto): Observable<String> {
    return from(this.appService.paymentTicket(dataPayment));
  }

  @MessagePattern({cmd: 'SUBSCRIPTION'})
  subscriptNewPlan(): Observable<String> {
    return from(this.appService.demoNewSubscription())
  }
}
