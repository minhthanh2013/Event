/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Subscription } from './models/subscription.interface';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  findAll(): Observable<Subscription[]> {
    return this.subscriptionService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Observable<Subscription> {
    return this.subscriptionService.findOne(+id);
  }
  @Post()
  create(@Body() subscription: Subscription): Observable<Subscription> {
    return this.subscriptionService.create(subscription);
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body() subscription: Subscription): Observable<UpdateResult> {
    return this.subscriptionService.update(+id, subscription);
  }
  @Delete(':id')
  remove(@Param('id') id: number): Observable<DeleteResult> {
    return this.subscriptionService.remove(+id);
  }
}
