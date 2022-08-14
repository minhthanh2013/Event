/* eslint-disable prettier/prettier */
import { HostEntity } from 'src/host/models/host.entity';
import { PaymentEntity } from 'src/payment/models/payment.entity';
import { SubscriptionPlanEntity } from 'src/subscriptionplan/models/subscription_plan.entity';
import { SubscriptionPlan } from 'src/subscriptionplan/models/subscription_plan.interface';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, OneToOne, } from 'typeorm';

@Entity('Subscription')
export class SubscriptionEntity {
  @PrimaryGeneratedColumn()
  subscription_id: number;
  @Column()
  start_date: Date;
  @Column()
  duration: number;
  @ManyToOne(() => HostEntity, (host) => host.subscriptions)
  @JoinColumn({
    name: "host_id",
    referencedColumnName: "host_id"
  })
  host: HostEntity;
  @ManyToOne(() => SubscriptionPlanEntity, (subscriptionPlan) => subscriptionPlan.subscriptions)
  @JoinColumn({
    name: "sub_detail",
    referencedColumnName: "plan_id"
  })
  subscriptionPlan: SubscriptionPlan;
  @ManyToOne(() =>PaymentEntity, (payment) => payment.payment_id)
  @JoinColumn({
    name: "payment_method",
    referencedColumnName: "payment_id"
  })
  payment_method: PaymentEntity
}
