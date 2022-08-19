import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { AddBalanceDto, PaymentDto, PaymentRecordDto, ResponseData, SubscriptionDto, TransactionInfo } from './payment/payment.dto';

@Injectable()
export class AppService {
  public constructor(@InjectStripe() private readonly stripeClient: Stripe) { }
  getHello(): string {
    return 'Hello World!';
  }

  async paymentTicket(paymentDto: PaymentDto): Promise<ResponseData> {
    const responseData = new ResponseData()
    const param: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: paymentDto.ticketQuantity,
          price_data: {
            product_data: {
              name: paymentDto.ticketName,
              description: paymentDto.description,
            },
            currency: 'vnd',
            unit_amount: paymentDto.ticketPrice
          },
        }
      ],
      success_url: `${process.env.MOCK_URL}?role=user`,
      cancel_url: `${process.env.CANCEL_URL}?role=user`,
      payment_intent_data: {
        description: 'BUY TICKET',
      },
      client_reference_id: paymentDto.conferenceId + '|' + paymentDto.userId
    }
    try {
      const result = await this.stripeClient.checkout.sessions.create(param)
      responseData.data = result.url
    } catch (err) {
      responseData.status = false
      console.log(err)
    }
    return responseData
  }

  async getAdminTransaction(): Promise<ResponseData> {
    const responseData = new ResponseData()
    try {
      const trans = await this.stripeClient.balanceTransactions.list()
      const res = new TransactionInfo()
      trans.data.forEach(index => {
        res.id = index.id
        res.amount = index.amount / 100
        res.created = new Date(index.created).toString()
        res.net = index.net / 100
        res.fee = index.fee / 100
        res.currency = 'vnd'
      })
      responseData.data = res
    } catch (err) {
      responseData.status = false
    }
    return responseData
  }

  async addBalance(balanceInfo: AddBalanceDto): Promise<ResponseData> {
    const responseData = new ResponseData()
    const param: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          name: 'ADD BALANCE TO ACCOUNT',
          quantity: 1,
          amount: balanceInfo.balance,
          currency: 'vnd'
        },
      ],
      success_url: `${process.env.MOCK_URL}?role=user`,
      cancel_url: `${process.env.CANCEL_URL}?role=user`,
      payment_intent_data: {
        description: 'ADD BALANCE'
      },
      client_reference_id: balanceInfo.idUser.toString()
    }
    try {
      const data = await this.stripeClient.checkout.sessions.create(param)
      responseData.data = data.url
    } catch (err) {
      responseData.status = false
      console.log(err)
    }
    return responseData
  }

  async newSubscription(idHost: number): Promise<ResponseData> {
    const responseData = new ResponseData()
    const temp = idHost.toString()
    const param: Stripe.Checkout.SessionCreateParams = {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: 1,
          price: process.env.PREMIUM_PLAN_ID_TEST,
          description: 'SUBSCRIBE PREMIUM PLAN (1 MONTH)'
        }
      ],
      success_url: `${process.env.MOCK_URL}?role=host`,
      cancel_url: `${process.env.CANCEL_URL}?role=host`,
      subscription_data: {
        description: 'SUBSCRIBE PREMIUM PLAN (1 MONTH)'
      },
      client_reference_id: temp
    }

    try {
      const result = await this.stripeClient.checkout.sessions.create(param)
      responseData.data = result.url
    } catch (err) {
      responseData.status = false
      console.log(err)
    }
    return responseData
  }

  async getAdminBalance(): Promise<ResponseData> {
    const responseData = new ResponseData();
    try {
      const param: Stripe.BalanceRetrieveParams = {

      }
      const balance = await this.stripeClient.balance.retrieve(param, {

      })
      const data = balance.pending[0].amount / 100
      responseData.data = data
    } catch (err) {
      responseData.status = false
      console.log(err)
    }
    return responseData
  }
  async getPaymentDetail(id: string): Promise<ResponseData> {
    const responseData = new ResponseData()
    try {
      const data = await this.stripeClient.paymentIntents.retrieve(id)
      responseData.data = data
    } catch (err) {
      responseData.status = false
    }
    return responseData
  }

  async getSessionLineItem(id_session: string): Promise<ResponseData> {
    const responseData = new ResponseData()
    try {
      const data = await this.stripeClient.checkout.sessions.retrieve(id_session)
      responseData.data = data
    } catch (err) {
      responseData.status = false
      console.log(err)
    }
    return responseData
  }

  async buyRecord(record: PaymentRecordDto): Promise<ResponseData> {
    const responseData = new ResponseData()
    try {
      const params: Stripe.Checkout.SessionCreateParams = {
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
          {
            quantity: 1,
            price_data: {
              product_data: {
                name: record.conferenceName,
                description: record.conferenceDescription,
              },
              currency: 'vnd',
              unit_amount: record.price
            },
          }
        ],
        success_url: `${process.env.MOCK_URL}?role=user`,
        cancel_url: `${process.env.CANCEL_URL}?role=user`,
        payment_intent_data: {
          description: 'BUY RECORD',
        },
        client_reference_id: record.conferenceId + '|' + record.userId
      }
      const data = await this.stripeClient.checkout.sessions.create(params)
      responseData.data = data.url
    } catch (err) {
      responseData.status = false
      console.log(err)
    }
    return responseData
  }
}
