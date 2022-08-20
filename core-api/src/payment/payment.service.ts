import { ComboSessionEntity } from 'src/combosession/models/combo_session.entity';
/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';
import { Observable } from 'rxjs';
import { ConferenceEntity } from 'src/conference/models/conference.entity';
import { HostEntity } from 'src/host/models/host.entity';
import { RecordEntity } from 'src/record/models/record.entity';
import { ResponseData } from 'src/responsedata/response-data.dto';
import { SubscriptionEntity } from 'src/subscription/models/subscription.entity';
import { SubscriptionPlanEntity } from 'src/subscriptionplan/models/subscription_plan.entity';
import { TicketEntity } from 'src/ticket/models/ticket.entity';
import { UserEntity } from 'src/user/models/user.entity';
import { User } from 'src/user/models/user.interface';
import { Repository } from 'typeorm/repository/Repository';
import { AddBalanceDto, BoughtRecordDto, BoughtTicketDto, PaymentDto, PaymentRecordDto, PaymentRecordWithBalanceDto, PaymentSessionWithBalanceDto, PaymentWithBalanceDto, SubscriptionDto } from './models/payment.dto';
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
    private readonly subPlanRepository: Repository<SubscriptionPlanEntity>,
    @InjectRepository(RecordEntity)
    private readonly recordRepository: Repository<RecordEntity>,
    @InjectRepository(ComboSessionEntity)
    private readonly comboRepository: Repository<ComboSessionEntity>,
  ) { }

  createPaymentLink(paymentDto: PaymentDto): Observable<ResponseData> {
    return this.paymentClient.send({ cmd: 'CHECKOUT' }, paymentDto)
  }
  newSubscription(subscriptionDto: SubscriptionDto): Observable<ResponseData> {
    const idHost = subscriptionDto.idHost;
    console.log(50, idHost)
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
  buyRecordWithStripe(paymentRecordDto: PaymentRecordDto): Observable<ResponseData> {
    return this.paymentClient.send({ cmd: 'BUY_RECORD'}, {paymentRecordDto})
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
        .set({ balance: parseInt((await this.getCurrentBalance(addBalanceDto.idUser)).toString()) + parseInt(addBalanceDto.balance.toString()) })
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
    const validateConfAmount = await this.conferenceRepository.findOneBy({ conference_id: ticketBoughtDto.conferenceId });
    const current_quant = validateConfAmount.current_quantity;
    const max_quant = validateConfAmount.ticket_quantity;
    if(current_quant >= max_quant) {
      responseData.status = false
      responseData.data = 'Ticket is full'
      return responseData;
    }
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

  async paymentTicketWithBalance(paymentDto: PaymentWithBalanceDto): Promise<ResponseData> {
    const responseData = new ResponseData()
    try {
      const user = await this.userRepository.findOne({ where: {user_id: paymentDto.userId} })
      const userBalance = user.balance;
      if(userBalance < parseInt(paymentDto.ticketPrice.toString())) {
        throw new Error('Not enough balance')
      }
      const res = await this.userRepository.createQueryBuilder()
      .update(UserEntity)
      .set({balance: parseInt(userBalance.toString()) - parseInt(paymentDto.ticketPrice.toString())})
      .where("user_id = :id", {id: paymentDto.userId})
      .execute()

      const data = await this.conferenceRepository.createQueryBuilder()
        .update(ConferenceEntity)
        .set({ current_quantity: await this.getCurrentTicketQuantity(paymentDto.conferenceId) - 1 })
        .where("conference_id = :id", { id: paymentDto.conferenceId })
        .execute()
        try {
          await this.ticketRepository.insert(
            {
              buyer_id: paymentDto.userId,
              conference_id: paymentDto.conferenceId,
              date_buy: new Date(),
              payment: await this.paymentRepository.findOneBy({ payment_id: 2 })
            }
          )
        } catch (err) {
          console.log(err)
        }
      responseData.status = res.affected == data.affected
    } catch (err) {
      responseData.status = false;
      responseData.data 
    }
    return responseData
  }

  async paymentSessionWithBalance(paymentDto: PaymentSessionWithBalanceDto): Promise<ResponseData> {
    const responseData = new ResponseData()
    const combos = await this.comboRepository.find({ where: {combo_id: paymentDto.sessionId} })
    try {
      const user = await this.userRepository.findOne({ where: {user_id: paymentDto.userId} })
      // Check if user already buy the session
      const tickets = await this.ticketRepository.find({ where: {buyer_id: paymentDto.userId, session_id: paymentDto.sessionId} })
      if(tickets.length === combos.length) {
        throw new Error('User already buy this session')
      }
      // Check if user met the required balance
      const userBalance = user.balance;
      if(userBalance < parseInt(paymentDto.sessionPrice.toString())) {
        throw new Error('Not enough balance')
      }

      const res = await this.userRepository.createQueryBuilder()
      .update(UserEntity)
      .set({balance: parseInt(userBalance.toString()) - parseInt(paymentDto.sessionPrice.toString())})
      .where("user_id = :id", {id: paymentDto.userId})
      .execute()

      let countAffectedConference = 0;
      for (let index = 0; index < combos.length; index++) {
        const combo = combos[index];
        const conferenceId = combo.conference_id;
        // const conferencePrice = conference.price;
        const data = await this.conferenceRepository.createQueryBuilder()
        .update(ConferenceEntity)
        .set({ current_quantity: await this.getCurrentTicketQuantity(conferenceId) - 1 })
        .where("conference_id = :id", { id: conferenceId })
        .execute()
        try {
          await this.ticketRepository.insert(
            {
              buyer_id: paymentDto.userId,
              conference_id: conferenceId,
              date_buy: new Date(),
              payment: await this.paymentRepository.findOneBy({ payment_id: 2 }),
              session_id: paymentDto.sessionId
            }
          )
        } catch (err) {
          throw err;
        }
        countAffectedConference += data.affected;
      }
      responseData.status = res.affected == 1 && combos.length == countAffectedConference
    } catch (err) {
      responseData.status = false;
      responseData.data = err.message;
    }
    return responseData
  }

  async updateRecord(record: BoughtRecordDto) {
    try {
      await this.recordRepository
      .insert({
        buyer_id: record.userId,
        conference_id: record.conferenceId,
        payment_method: record.payment_method,
        price: record.price_record
      })
    } catch (err) {
      console.log(err)
    }
  }

  async buyRecordWithBalance(record: PaymentRecordWithBalanceDto): Promise<ResponseData> {
    const responseData = new ResponseData()
    try {
      await this.recordRepository
      .insert({
        buyer_id: record.userId,
        conference_id: record.conferenceId,
        payment_method: 2,
        price: record.price
      })

      await this.userRepository.createQueryBuilder()
      .update(UserEntity)
      .set({balance: parseInt(record.balance.toString()) - parseInt(record.price.toString())})
      .where("user_id = :id", {id: record.userId})
      .execute()
    } catch (err) {
      console.log(err)
      responseData.status = false
    }
    return responseData
  }
}
