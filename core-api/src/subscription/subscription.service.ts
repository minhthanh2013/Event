import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
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
  create(subscription: Subscription): Observable<Subscription> {
    return from(this.subscriptionRepository.save(subscription));
  }
}
