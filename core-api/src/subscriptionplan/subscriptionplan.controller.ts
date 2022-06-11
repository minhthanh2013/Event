import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SubscriptionPlan } from './models/subscription_plan.interface';
import { SubscriptionplanService } from './subscriptionplan.service';

@Controller('subscriptionplan')
export class SubscriptionplanController {
  constructor(private subscriptionPlanService: SubscriptionplanService) {}

  @Get()
  findAll(): Observable<SubscriptionPlan[]> {
    return this.subscriptionPlanService.findAll();
  }

  @Post()
  create(
    @Body() subscriptionPlan: SubscriptionPlan,
  ): Observable<SubscriptionPlan> {
    return this.subscriptionPlanService.create(subscriptionPlan);
  }
}
