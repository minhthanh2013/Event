/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';
import { Observable } from 'rxjs';
import { ConferenceEntity } from 'src/conference/models/conference.entity';
import { HostEntity } from 'src/host/models/host.entity';
import { ResponseData } from 'src/responsedata/response-data.dto';
import { SubscriptionEntity } from 'src/subscription/models/subscription.entity';
import { SubscriptionPlanEntity } from 'src/subscriptionplan/models/subscription_plan.entity';
import { TicketEntity } from 'src/ticket/models/ticket.entity';
import { UserEntity } from 'src/user/models/user.entity';
import { User } from 'src/user/models/user.interface';
import { Repository } from 'typeorm/repository/Repository';
import { AddBalanceDto, BoughtTicketDto, PaymentDto, SubscriptionDto } from './models/payment.dto';
import { PaymentEntity } from './models/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENT') private readonly paymentClient: ClientProxy,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ConferenceEntity)
    private readonly conferenceRepository: Repository<ConferenceEntity>,
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepository: Repository<SubscriptionEntity>,
    @InjectRepository(HostEntity)
    private readonly hostRepository: Repository<HostEntity>,
    @InjectRepository(SubscriptionPlanEntity)
    private readonly subPlanRepository: Repository<SubscriptionPlanEntity>
  ) { }

  createPaymentLink(paymentDto: PaymentDto): Observable<ResponseData> {
    return this.paymentClient.send({ cmd: 'CHECKOUT' }, paymentDto)
  }
  newSubscription(subscriptionDto: SubscriptionDto): Observable<ResponseData> {
    const idHost = subscriptionDto.idHost;
    return this.paymentClient.send({ cmd: 'SUBSCRIPTION' }, { idHost })
  }
  getInfoPayment(payment_intent_id: string): Observable<ResponseData> {
    return this.paymentClient.send({ cmd: 'DETAIL_PAYMENT' }, payment_intent_id)
  }
  addBalanceUser(addBalanceDto: AddBalanceDto): Observable<ResponseData> {
    return this.paymentClient.send({ cmd: 'ADD_BALANCE' }, addBalanceDto)
  }
  getInfoSession(id_session: string): Observable<ResponseData> {
    return this.paymentClient.send({ cmd: 'INFO_SESSION' }, id_session)
  }

  async getCurrentBalance(id: number): Promise<number> {
    return (await this.userRepository.findOneBy({ user_id: id })).balance
  }

  async getCurrentTicketQuantity(id: number): Promise<number> {
    return (await this.conferenceRepository.findOneBy({ conference_id: id })).current_quantity
  }

  async updateBalance(addBalanceDto: AddBalanceDto): Promise<ResponseData> {
    const responseData = new ResponseData()
    try {
      const data = await this.userRepository.createQueryBuilder()
        .update(UserEntity)
        .set({ balance: await this.getCurrentBalance(addBalanceDto.idUser) + addBalanceDto.balance })
        .where("user_id = :id", { id: addBalanceDto.idUser })
        .execute()
      if (data.affected == 1) {
        responseData.data = true
      }
    } catch (err) {
      responseData.status = false
    }
    return responseData
  }
  async updateTicketQuantity(ticketBoughtDto: BoughtTicketDto): Promise<ResponseData> {
    const responseData = new ResponseData()
    try {
      const data = await this.conferenceRepository.createQueryBuilder()
        .update(ConferenceEntity)
        .set({ current_quantity: await this.getCurrentTicketQuantity(ticketBoughtDto.conferenceId) - 1 })
        .where("conference_id = :id", { id: ticketBoughtDto.conferenceId })
        .execute()
      if (data.affected == 1) {
        responseData.data = true
      } else {
        responseData.status = false
      }
    } catch (err) {
      responseData.status = false
      console.log(err)
    }
    return responseData
  }

  async createUserTicket(ticketBoughtDto: BoughtTicketDto) {
    try {
      await this.ticketRepository.insert(
        {
          buyer_id: ticketBoughtDto.userId,
          conference_id: ticketBoughtDto.conferenceId,
          date_buy: new Date(),
          payment: await this.paymentRepository.findOneBy({ payment_id: 1 })
        }
      )
    } catch (err) {
      console.log(err)
    }
  }
  async updateSubscription(subDto: SubscriptionDto) {
    const expire = await this.subscriptionRepository.findOneBy({ host_id: subDto.idHost })
    const date = new Date()
    if (expire == null) {
      try {
        await this.subscriptionRepository.insert({
          expired_date: new Date(date.setDate(date.getDate() + 30)),
          host: await this.hostRepository.findOneBy({ host_id: subDto.idHost }),
          payment: await this.paymentRepository.findOneBy({ payment_id: 1 }),
          subscriptionPlan: await this.subPlanRepository.findOneBy({ plan_id: 1 })
        })
      } catch (err) {
        console.log(err)
        return
      }
    } else {
      try {
        if (expire.expired_date >= date) {
          date.setDate(expire.expired_date.getDate() + 30)
        } else {
          date.setDate(date.getDate() + 30)
        }
        await this.subscriptionRepository.createQueryBuilder()
          .update(SubscriptionEntity)
          .set({ expired_date: new Date(date) })
          .where("host_id = :id", { id: subDto.idHost })
          .execute()
      } catch (err) {
        console.log(err)
        return
      }
    }
    try {
      await this.hostRepository.createQueryBuilder()
      .update(HostEntity)
      .set({host_type: 'premium'})
      .where("host_id = :id", {id: subDto.idHost})
      .execute()
    } catch (err) {
      console.log(err)
      return
    }
  }
}
