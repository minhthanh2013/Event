/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ResponseData } from 'src/responsedata/response-data.dto';
import { PaymentDto } from './models/payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENT') private readonly paymentClient: ClientProxy,
  ) {}
  
  createPaymentLink(paymentDto: PaymentDto): Observable<ResponseData> {
    return this.paymentClient.send({ cmd: 'CHECKOUT'}, paymentDto)
  }
}
