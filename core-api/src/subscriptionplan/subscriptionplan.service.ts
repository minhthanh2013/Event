/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
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
  findOne(id: number): Observable<SubscriptionPlan> {
    return from(this.subscriptionPlanRepository.findOne({where: {plan_id: id}}));
  }
  create(subscriptionPlan: SubscriptionPlan): Observable<SubscriptionPlan> {
    return from(this.subscriptionPlanRepository.save(subscriptionPlan));
  }
  update(id: number, subscriptionPlan: SubscriptionPlan): Observable<UpdateResult> {
    return from(this.subscriptionPlanRepository.update(id, subscriptionPlan));
  }
  remove(id: number): Observable<DeleteResult> {
    return from(this.subscriptionPlanRepository.delete(id));
  }
}
