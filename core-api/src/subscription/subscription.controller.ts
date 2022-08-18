/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { ResponseData } from 'src/responsedata/response-data.dto';
import { UpdateResult, DeleteResult } from 'typeorm';
import { SubscriptionDto } from './models/subscription.dto';
import { SubscriptionEntity } from './models/subscription.entity';
import { Subscription } from './models/subscription.interface';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}
  @Post()
  create(@Body() subscription: SubscriptionDto): Observable<ResponseData> {
    return from(this.subscriptionService.create(subscription));
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body() subscription: Subscription): Observable<UpdateResult> {
    return this.subscriptionService.update(+id, subscription);
  }
  @Delete(':id')
  remove(@Param('id') id: number): Observable<DeleteResult> {
    return this.subscriptionService.remove(+id);
  }
  @Post('/renew-subscription')
  updateSubscription(@Body() id: number): Observable<ResponseData> {
    return from(this.subscriptionService.updateSubscription(id));
  }
}
