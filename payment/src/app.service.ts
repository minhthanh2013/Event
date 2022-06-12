import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

@Injectable()
export class AppService {
  public constructor(@InjectStripe() private readonly stripeClient: Stripe) {}
  getHello(): string {
    return 'Hello World!';
  }

  demoPayment() {
    const param: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          name: 'MOCK TICKET',
          amount: 10000,
          currency: "vnd",
          quantity: 10
        }
      ],
      success_url: `${process.env.MOCK_URL}/success`,
      cancel_url: `${process.env.MOCK_URL}/cancel`,
    }
    return this.stripeClient.checkout.sessions.create(param)
  }

  newSubscription() {
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
    return this.stripeClient.checkout.sessions.create(param)
  }
}
