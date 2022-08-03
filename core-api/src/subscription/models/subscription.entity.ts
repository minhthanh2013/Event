/* eslint-disable prettier/prettier */
import { HostEntity } from 'src/host/models/host.entity';
import { SubscriptionPlanEntity } from 'src/subscriptionplan/models/subscription_plan.entity';
import { SubscriptionPlan } from 'src/subscriptionplan/models/subscription_plan.interface';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, } from 'typeorm';

@Entity('Subscription')
export class SubscriptionEntity {
  @PrimaryGeneratedColumn()
  subscription_id: number;
  @Column()
  start_date: Date;
  @Column()
  duration: number;
  @Column()
  host_id: number;
  @ManyToOne(() => HostEntity, (host) => host.subscriptions)
  @JoinColumn({
    name: "host_id",
    referencedColumnName: "host_id"
  })
  host: HostEntity;
  @Column()
  sub_detail: number;
  @ManyToOne(() => SubscriptionPlanEntity, (subscriptionPlan) => subscriptionPlan.subscriptions)
  @JoinColumn({
    name: "sub_detail",
    referencedColumnName: "plan_id"
  })
  
  subscriptionPlan: SubscriptionPlan;
}
