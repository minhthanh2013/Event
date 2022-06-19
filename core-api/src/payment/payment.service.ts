/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
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
  findOne(id: number): Observable<Payment> {
    return from(this.paymentRepository.findOne({where: {payment_id: id}}));
  }
  createPayment(payment: Payment): Observable<Payment> {
    return from(this.paymentRepository.save(payment));
  }
  update(id: number, payment: Payment): Observable<UpdateResult> {
    return from(this.paymentRepository.update(id, payment));
  }
  remove(id: number): Observable<DeleteResult> {
    return from(this.paymentRepository.delete(id));
  }
}
