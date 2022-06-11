import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Payment } from './models/payment.interface';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get()
  findAll(): Observable<Payment[]> {
    return this.paymentService.findAllPayments();
  }

  @Post()
  create(@Body() payment: Payment): Observable<Payment> {
    return this.paymentService.createPayment(payment);
  }
}
