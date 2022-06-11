/* eslint-disable prettier/prettier */
import { ConferenceEntity } from "src/conference/models/conference.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Record')
export class RecordEntity {
    @PrimaryGeneratedColumn()
    record_id: number;
    @Column()
    record_url: string;
    @OneToOne(
        () => ConferenceEntity,
        (conferenceEntity) => conferenceEntity.conference_id,
      )
    conference: ConferenceEntity;
}