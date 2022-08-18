/* eslint-disable prettier/prettier */
import { ConferenceEntity } from "src/conference/models/conference.entity";
import { PaymentEntity } from "src/payment/models/payment.entity";
import { UserEntity } from "src/user/models/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Record')
export class RecordEntity {
    @PrimaryGeneratedColumn()
    record_id: number;
    @Column()
    buyer_id: number;
    @OneToOne(
      () => UserEntity,
      (userEntity) => userEntity.user_id,
    )
    @JoinColumn({
      name: 'buyer_id',
      referencedColumnName: 'user_id',
    })
    user: UserEntity;
    @Column()
    conference_id: number;
    @OneToOne(
        () => ConferenceEntity,
        (conferenceEntity) => conferenceEntity.conference_id,
      )
    @JoinColumn({
        name: 'conference_id',
        referencedColumnName: 'conference_id',
      })
    conference: ConferenceEntity;
    @Column()
    payment_method: number;
    @OneToOne(
      () => PaymentEntity,
      (paymentEntity) => paymentEntity.payment_id,
    )
    @JoinColumn({
      name: 'payment_id',
      referencedColumnName: 'payment_id',
    })
    payment: PaymentEntity;
    @Column()
    price: number;
}