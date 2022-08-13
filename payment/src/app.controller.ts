import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { AppService } from './app.service';
import { PaymentDto, ResponseData, SubscriptionDto } from './payment/payment.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({cmd: 'CHECKOUT'})
  ticketPayment(dataPayment: PaymentDto): Observable<ResponseData> {
    return from(this.appService.paymentTicket(dataPayment));
  }

  @MessagePattern({cmd: 'SUBSCRIPTION'})
  subscriptNewPlan(): Observable<ResponseData> {
    return from(this.appService.newSubscription())
  }
}
