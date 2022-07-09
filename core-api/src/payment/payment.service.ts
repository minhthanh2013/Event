/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { PaymentDto } from './models/payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENT') private readonly paymentClient: ClientProxy,
  ) {}
  
  createPaymentLink(paymentDto: PaymentDto): Observable<String> {
    return this.paymentClient.send({ cmd: 'CHECKOUT'}, paymentDto)
  }
}
