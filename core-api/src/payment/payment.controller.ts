/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Payment } from './models/payment.interface';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get()
  findAll(): Observable<Payment[]> {
    return this.paymentService.findAllPayments();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Observable<Payment> {
    return this.paymentService.findOne(+id);
  }
  @Post()
  create(@Body() payment: Payment): Observable<Payment> {
    return this.paymentService.createPayment(payment);
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body() payment: Payment): Observable<UpdateResult> {
    return this.paymentService.update(+id, payment);
  }
  @Delete(':id')
  remove(@Param('id') id: number): Observable<DeleteResult> {
    return this.paymentService.remove(+id);
  }
}
