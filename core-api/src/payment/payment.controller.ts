import { EmailService } from 'src/email/email.service';
/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Req } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { ResponseData } from 'src/responsedata/response-data.dto';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { AddBalanceDto, BoughtRecordDto, BoughtTicketDto, PaymentDto, PaymentRecordDto, PaymentRecordWithBalanceDto, PaymentWithBalanceDto, SubscriptionDto } from './models/payment.dto';
import { PaymentService } from './payment.service';
import { PaymentSessionWithBalanceDto, SessionDto } from './models/payment.dto';
@Controller('payment')
export class PaymentController {
  constructor(
    private paymentService: PaymentService) { }

  @Post('/create-payment-link')
  createPaymentLink(@Body() paymentDto: PaymentDto): Observable<ResponseData> {
    return this.paymentService.createPaymentLink(paymentDto)
  }
  @Post('/new-subscription')
  newSubscription(@Body() subscriptionDto: SubscriptionDto): Observable<ResponseData> {
    return this.paymentService.newSubscription(subscriptionDto)
  }
  @Post('/buy-record')
  buyRecord(@Body() paymentRecordDto: PaymentRecordDto): Observable<ResponseData> {
    return this.paymentService.buyRecordWithStripe(paymentRecordDto)
  }
  @Post('/add-balance')
  addBalance(@Body() addBalanceDto: AddBalanceDto): Observable<ResponseData> {
    return this.paymentService.addBalanceUser(addBalanceDto)
  }
  @Post('/buy-session')
  buySession(@Body() sessionDto: SessionDto): Observable<ResponseData> {
    return from(this.paymentService.buySessionWithStripe(sessionDto))
  }
  @Post('/payment-ticket-with-balance')
  paymentTicketWithBalance(@Body() paymentDto: PaymentWithBalanceDto): Observable<ResponseData> {
    return from(this.paymentService.paymentTicketWithBalance(paymentDto))
  }
  @Post('/payment-session-with-balance')
  paymentSessionWithBalance(@Body() paymentDto: PaymentSessionWithBalanceDto): Observable<ResponseData> {
    return from(this.paymentService.paymentSessionWithBalance(paymentDto))
  }
  @Post('/buy-record-wit-balance')
  buyRecordWithBalance(@Body() recordDto: PaymentRecordWithBalanceDto): Observable<ResponseData> {
    return from(this.paymentService.buyRecordWithBalance(recordDto))
  }

  @Post('/webhook')
  async webhook(@Req() req: any) {
    const event = req.body
    if (event.type == 'checkout.session.completed') {
      const date = new Date()
      date.setDate(date.getDate() + 30)
      console.log(new Date(date))
      if (event.data.object.mode == 'payment') {
        const id_session = event.data.object.id as string
        const payment_intent_id = event.data.object.payment_intent as string
        const description = await this.paymentService.getInfoPayment(payment_intent_id).toPromise()
        if (description.data.description == 'ADD BALANCE') {
          // Update balance for user
          console.log("add balance")
          const balance = event.data.object.amount_total as number
          const balanceDto = new AddBalanceDto()
          balanceDto.balance = balance
          balanceDto.idUser = event.data.object.client_reference_id as number
          this.paymentService.updateBalance(balanceDto)
        } else if (description.data.description == 'BUY TICKET') {
          // Update ticket quantity and add ticket to user database
          console.log("buy ticket")
          const session = await this.paymentService.getInfoSession(id_session).toPromise()
          console.log(session.data)
          const conferenceId = (session.data.client_reference_id as string).split('|')[0]
          const userId = (session.data.client_reference_id as string).split('|')[1]
          const ticketDto = new BoughtTicketDto()
          ticketDto.conferenceId = conferenceId as unknown as number
          ticketDto.userId = userId as unknown as number
          this.paymentService.updateTicketQuantity(ticketDto)
          this.paymentService.createUserTicket(ticketDto, 0)
          this.paymentService.sendEmail(ticketDto)
          // 20/8/2022
        } else if (description.data.description == 'BUY SESSION') {
          // Update ticket quantity and add ticket to user database
          console.log("buy session")
          const session = await this.paymentService.getInfoSession(id_session).toPromise()
          // console.log(session.data)
          const sessionId = (session.data.client_reference_id as string).split('|')[0] as unknown as number
          const userId = (session.data.client_reference_id as string).split('|')[1] as unknown as number
          const listConference = (await this.paymentService.getConferenceListBySessionId(sessionId))
          const listConferenceId = listConference.data as number[]
          for (let index = 0; index < listConferenceId.length; index++) {
            const element = listConferenceId[index];
            const ticketDto = new BoughtTicketDto()
            ticketDto.userId = userId
            ticketDto.conferenceId = element
            console.log(ticketDto)
            this.paymentService.updateTicketQuantity(ticketDto)
            this.paymentService.createUserTicket(ticketDto, sessionId)
          }
          this.paymentService.sendEmailOfSession(userId, sessionId)
        } else if (description.data.description == 'BUY RECORD') {
          console.log('buy record')
          const session = await this.paymentService.getInfoSession(id_session).toPromise()
          console.log(session.data)
          const recordDto = new BoughtRecordDto()
          recordDto.conferenceId = parseInt((session.data.client_reference_id as string).split('|')[0])
          recordDto.userId = parseInt((session.data.client_reference_id as string).split('|')[1])
          recordDto.price_record = parseInt(event.data.object.amount_total.toString())
          recordDto.payment_method = 1
          this.paymentService.updateRecord(recordDto)
        }
      } else {
        // SUBSCRIBE PREMIUM PLAN
        console.log("subscribe to premium")
        console.log(JSON.parse(event.data.object.client_reference_id))
        const subDto = new SubscriptionDto()
        subDto.idHost = event.data.object.client_reference_id as number
        console.log(subDto)
        console.log(subDto.idHost)
        this.paymentService.updateSubscription(subDto)
      }
    }
  }
}
