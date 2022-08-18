/* eslint-disable prettier/prettier */
import { ConferenceEntity } from "src/conference/models/conference.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Record')
export class RecordEntity {
    @PrimaryGeneratedColumn()
    record_id: number;
    @Column()
    buyer_id: string;
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
}