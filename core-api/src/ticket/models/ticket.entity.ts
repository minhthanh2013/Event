/* eslint-disable prettier/prettier */
import { ConferenceEntity } from 'src/conference/models/conference.entity';
import { PaymentEntity } from 'src/payment/models/payment.entity';
import { UserEntity } from 'src/user/models/user.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Ticket')
export class TicketEntity {
  @PrimaryGeneratedColumn()
  ticket_id: number;
  @ManyToOne(() => UserEntity, (buyer) => buyer.tickets)
  buyer: UserEntity;
  @OneToOne(
    () => ConferenceEntity,
    (conferenceEntity) => conferenceEntity.conference_id,
  )
  conference: ConferenceEntity;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_buy: Date;
  @OneToOne(
    () => PaymentEntity,
    (payment) => payment.payment_id,
  )
  payment: PaymentEntity;
}
