/* eslint-disable prettier/prettier */
import { SubscriptionEntity } from 'src/subscription/models/subscription.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity("SubscriptionPlan")
export class SubscriptionPlanEntity {
  @PrimaryGeneratedColumn()
  plan_id: number;
  @Column()
  plan_name: string;
  @Column()
  price_per_month: number;
  @OneToMany(
    () => SubscriptionEntity,
    (subscription) => subscription.subscriptionPlan,
  )
  subscriptions: SubscriptionEntity[];
}
