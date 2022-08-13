import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { PaymentDto, ResponseData } from './payment/payment.dto';

@Injectable()
export class AppService {
  public constructor(@InjectStripe() private readonly stripeClient: Stripe) {}
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
          name: paymentDto.ticketName,
          amount: paymentDto.ticketPrice,
          currency: "vnd",
          quantity: paymentDto.ticketQuantity
        }
      ],
      success_url: `${process.env.MOCK_URL}/success`,
      cancel_url: `${process.env.MOCK_URL}/cancel`,
    }
    try {
      const result = await this.stripeClient.checkout.sessions.create(param)
      responseData.data = result.url
    } catch(err) {
      responseData.status = false
      console.log(err)
    }
    return responseData
  }

  async newSubscription(): Promise<ResponseData> {
    const responseData = new ResponseData()
    const param: Stripe.Checkout.SessionCreateParams = {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: 1,
          price: process.env.PREMIUM_PLAN_ID_TEST,
        }
      ],
      success_url: `${process.env.MOCK_URL}`,
      cancel_url: `${process.env.MOCK_URL}`,
    }
    try {
      const result = await this.stripeClient.checkout.sessions.create(param)
      responseData.data = result.url
    } catch(err) {
      responseData.status = false
      console.log(err)
    }
    return responseData
  }

  async demoNewSubscription(): Promise<string> {
    const param: Stripe.Checkout.SessionCreateParams = {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: 1,
          price: 'price_1L8UvGLHHzSNpGj2LAmyoQmt',
        }
      ],
      success_url: `${process.env.MOCK_URL}/success`,
      cancel_url: `${process.env.MOCK_URL}/cancel`,
    }
    const result = await this.stripeClient.checkout.sessions.create(param)
    return result.url
  }
}
