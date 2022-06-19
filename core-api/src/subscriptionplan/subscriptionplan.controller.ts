/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UpdateResult, DeleteResult } from 'typeorm';
import { SubscriptionPlan } from './models/subscription_plan.interface';
import { SubscriptionplanService } from './subscriptionplan.service';

@Controller('subscriptionplan')
export class SubscriptionplanController {
  constructor(private subscriptionPlanService: SubscriptionplanService) {}

  @Get()
  findAll(): Observable<SubscriptionPlan[]> {
    return this.subscriptionPlanService.findAll();
  }
  findOne(@Param('id') id: string): Observable<SubscriptionPlan> {
    return this.subscriptionPlanService.findOne(+id);
  }
  @Post()
  create(
    @Body() subscriptionPlan: SubscriptionPlan,
  ): Observable<SubscriptionPlan> {
    return this.subscriptionPlanService.create(subscriptionPlan);
  }
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() subscriptionPlan: SubscriptionPlan,
  ): Observable<UpdateResult> {
    return this.subscriptionPlanService.update(+id, subscriptionPlan);
  }
  @Delete(':id')
  remove(@Param('id') id: number): Observable<DeleteResult> {
    return this.subscriptionPlanService.remove(+id);
  }
}
