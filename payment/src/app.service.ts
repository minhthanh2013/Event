import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Console } from 'console';
import { InjectStripe } from 'nestjs-stripe';
import { from, Observable, of } from 'rxjs';
import Stripe from 'stripe';
import { PaymentDto } from './payment/payment.dto';

@Injectable()
export class AppService {
  public constructor(@InjectStripe() private readonly stripeClient: Stripe) {}
  getHello(): string {
    return 'Hello World!';
  }

  async paymentTicket(paymentDto: PaymentDto): Promise<String> {
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
    const result = await this.stripeClient.checkout.sessions.create(param)
    return result.url
  }

  async demoNewSubscription(): Promise<String> {
    const param: Stripe.Checkout.SessionCreateParams = {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: 1,
          price: process.env.PREMIUM_PLAN_ID
        }
      ],
      success_url: `${process.env.MOCK_URL}/success`,
      cancel_url: `${process.env.MOCK_URL}/cancel`,
    }
    const result = await this.stripeClient.checkout.sessions.create(param)
    return result.url
  }
}
