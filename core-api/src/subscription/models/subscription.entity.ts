/* eslint-disable prettier/prettier */
import { HostEntity } from 'src/host/models/host.entity';
import { SubscriptionPlanEntity } from 'src/subscriptionplan/models/subscription_plan.entity';
import { SubscriptionPlan } from 'src/subscriptionplan/models/subscription_plan.interface';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Subscription')
export class SubscriptionEntity {
  @PrimaryGeneratedColumn()
  subscription_id: number;
  @Column()
  start_date: Date;
  @Column()
  duration: number;
  @ManyToOne(() => HostEntity, (host) => host.subscriptions)
  host: HostEntity;
  @ManyToOne(() => SubscriptionPlanEntity, (subscriptionPlan) => subscriptionPlan.subscriptions)
  subscriptionPlan: SubscriptionPlan;
}
