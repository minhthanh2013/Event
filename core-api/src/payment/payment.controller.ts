/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PaymentDto } from './models/payment.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('/create-payment-link')
  createPaymentLink(@Body() paymentDto: PaymentDto): Observable<String> {
    return this.paymentService.createPaymentLink(paymentDto)
  }
}
