/* eslint-disable prettier/prettier */
import { ConferenceEntity } from 'src/conference/models/conference.entity';
import { PaymentEntity } from 'src/payment/models/payment.entity';
import { UserEntity } from 'src/user/models/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Ticket')
export class TicketEntity {
  @PrimaryGeneratedColumn()
  ticket_id: number;
  @ManyToOne(() => UserEntity, (buyer) => buyer.tickets)
  @JoinColumn({
    name: "buyer_id",
    referencedColumnName: "user_id"
  })
  buyer: UserEntity;
  @OneToOne(
    () => ConferenceEntity,
    (conferenceEntity) => conferenceEntity.conference_id,
  )
  @JoinColumn({
    name: "conference_id",
    referencedColumnName: "conference_id"
  })
  conference: ConferenceEntity;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_buy: Date;
  @OneToOne(
    () => PaymentEntity,
    (payment) => payment.payment_id,
  )
  @JoinColumn({
    name: "payment_id",
    referencedColumnName: "payment_id"
  })
  payment: PaymentEntity;
}
