import { Module } from '@nestjs/common';
import { SubscriptionplanService } from './subscriptionplan.service';
import { SubscriptionplanController } from './subscriptionplan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionPlanEntity } from './models/subscription_plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionPlanEntity])],
  providers: [SubscriptionplanService],
  controllers: [SubscriptionplanController],
})
export class SubscriptionplanModule {}
