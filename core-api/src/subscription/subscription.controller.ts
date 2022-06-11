import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Subscription } from './models/subscription.interface';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  findAll(): Observable<Subscription[]> {
    return this.subscriptionService.findAll();
  }

  @Post()
  create(@Body() subscription: Subscription): Observable<Subscription> {
    return this.subscriptionService.create(subscription);
  }
}
