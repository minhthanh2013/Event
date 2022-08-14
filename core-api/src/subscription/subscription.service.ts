/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { HostEntity } from 'src/host/models/host.entity';
import { ResponseData } from 'src/responsedata/response-data.dto';
import { SubscriptionPlanEntity } from 'src/subscriptionplan/models/subscription_plan.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { SubscriptionDto } from './models/subscription.dto';
import { SubscriptionEntity } from './models/subscription.entity';
import { Subscription } from './models/subscription.interface';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepository: Repository<SubscriptionEntity>,
    @InjectRepository(HostEntity)
    private readonly hostRepository: Repository<HostEntity>,
    @InjectRepository(SubscriptionPlanEntity)
    private readonly subPlanRepository: Repository<SubscriptionPlanEntity>,
  ) {}

  findAll(): Observable<Subscription[]> {
    return from(this.subscriptionRepository.find());
  }
  findOne(id: number): Observable<Subscription> {
    return from(this.subscriptionRepository.findOne({where: {subscription_id: id}}));
  }
  async create(subscription: SubscriptionDto): Promise<ResponseData> {
    const responseData = new ResponseData()
    const result = await this.subscriptionRepository.save(await this.convertDtoToEntity(subscription))
    if (result !== undefined) {
      responseData.data = result
    } else {
      responseData.status = false
    }
    return responseData;
  }
  update(id: number, subscription: Subscription): Observable<UpdateResult> {
    return from(this.subscriptionRepository.update(id, subscription));
  }
  remove(id: number): Observable<DeleteResult> {
    return from(this.subscriptionRepository.delete(id));
  }
  async updateSubscription(id: number): Promise<ResponseData> {
    const result = new ResponseData();
    const data = await this.subscriptionRepository.createQueryBuilder()
    .update(SubscriptionEntity)
    .set({duration: +30})
    .where("host_id = :id", {id: id})
    .execute()
    if (data.affected == 1) {
      result.data = data.raw
    } else {
      result.status = false
    }
    return result;
  }

  async convertDtoToEntity(params: SubscriptionDto): Promise<SubscriptionEntity> {
    const entity = new SubscriptionEntity()
    entity.duration = params.duration
    entity.host = await this.hostRepository.findOne({where: {
      host_id: params.host_id
    }})
    entity.start_date = params.start_date
    entity.subscription_id = params.plan_id
    entity.subscriptionPlan = await this.subPlanRepository.findOne({ where : {
      plan_id: params.plan_id
    }})
    return entity
  }
}
