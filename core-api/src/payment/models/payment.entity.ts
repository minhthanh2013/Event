/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('Payment')
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  payment_id: number;
  @Column()
  payment_name: string;
}