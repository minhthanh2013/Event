import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HostEntity } from 'src/host/models/host.entity';
import { PaymentEntity } from 'src/payment/models/payment.entity';
import { SubscriptionPlanEntity } from 'src/subscriptionplan/models/subscription_plan.entity';
import { SubscriptionEntity } from './models/subscription.entity';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SubscriptionEntity,
      HostEntity,
      SubscriptionPlanEntity,
      PaymentEntity,
    ]),
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
