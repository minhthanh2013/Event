import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { AppService } from './app.service';
import { AddBalanceDto, PaymentDto, PaymentRecordDto, ResponseData, SubscriptionDto } from './payment/payment.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: 'CHECKOUT' })
  ticketPayment(dataPayment: PaymentDto): Observable<ResponseData> {
    return from(this.appService.paymentTicket(dataPayment));
  }
  @MessagePattern({ cmd: 'SUBSCRIPTION' })
  subscriptNewPlan(idHost: any): Observable<ResponseData> {
    console.log(22, idHost.idHost);
    return from(this.appService.newSubscription(idHost.idHost))
  }
  @MessagePattern({ cmd: 'DETAIL_PAYMENT'})
  paymentDetail(payment_intent_id: string): Observable<ResponseData> {
    return from(this.appService.getPaymentDetail(payment_intent_id))
  }
  @MessagePattern({ cmd: 'ADD_BALANCE'})
  addBalanceUser(addBalanceDto: AddBalanceDto): Observable<ResponseData> {
    return from(this.appService.addBalance(addBalanceDto))
  }
  @MessagePattern({ cmd: 'INFO_SESSION'})
  getInfoSession(id_session: string): Observable<ResponseData> {
    return from(this.appService.getSessionLineItem(id_session))
  }
  @MessagePattern({ cmd: 'BUY_RECORD'})
  paymentRecord(paymentRecordDto: PaymentRecordDto): Observable<ResponseData> {
    return from(this.appService.buyRecord(paymentRecordDto))
  }
}
