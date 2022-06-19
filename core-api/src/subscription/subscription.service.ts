/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { SubscriptionEntity } from './models/subscription.entity';
import { Subscription } from './models/subscription.interface';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepository: Repository<SubscriptionEntity>,
  ) {}

  findAll(): Observable<Subscription[]> {
    return from(this.subscriptionRepository.find());
  }
  findOne(id: number): Observable<Subscription> {
    return from(this.subscriptionRepository.findOne({where: {subscription_id: id}}));
  }
  create(subscription: Subscription): Observable<Subscription> {
    return from(this.subscriptionRepository.save(subscription));
  }
  update(id: number, subscription: Subscription): Observable<UpdateResult> {
    return from(this.subscriptionRepository.update(id, subscription));
  }
  remove(id: number): Observable<DeleteResult> {
    return from(this.subscriptionRepository.delete(id));
  }
}
