/* eslint-disable prettier/prettier */
import { SubscriptionEntity } from 'src/subscription/models/subscription.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity('Payment')
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  payment_id: number;
  @Column()
  payment_name: string;
  @OneToMany(() => SubscriptionEntity, (subscription) => subscription.payment_method)
  subscriptions: SubscriptionEntity[];
}