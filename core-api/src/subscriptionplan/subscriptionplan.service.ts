import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { SubscriptionPlanEntity } from './models/subscription_plan.entity';
import { SubscriptionPlan } from './models/subscription_plan.interface';

@Injectable()
export class SubscriptionplanService {
  constructor(
    @InjectRepository(SubscriptionPlanEntity)
    private readonly subscriptionPlanRepository: Repository<SubscriptionPlanEntity>,
  ) {}

  findAll(): Observable<SubscriptionPlan[]> {
    return from(this.subscriptionPlanRepository.find());
  }
  create(subscriptionPlan: SubscriptionPlan): Observable<SubscriptionPlan> {
    return from(this.subscriptionPlanRepository.save(subscriptionPlan));
  }
}
