/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ResponseData } from 'src/responsedata/response-data.dto';
import { PaymentDto } from './models/payment.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('/create-payment-link')
  createPaymentLink(@Body() paymentDto: PaymentDto): Observable<ResponseData> {
    return this.paymentService.createPaymentLink(paymentDto)
  }
}
