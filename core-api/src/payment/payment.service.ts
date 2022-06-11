import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';
import { PaymentEntity } from './models/payment.entity';
import { Payment } from './models/payment.interface';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}
  findAllPayments(): Observable<Payment[]> {
    return from(this.paymentRepository.find());
  }

  createPayment(payment: Payment): Observable<Payment> {
    return from(this.paymentRepository.save(payment));
  }
}
