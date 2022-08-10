/* eslint-disable prettier/prettier */
import { ConferenceEntity } from "src/conference/models/conference.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('record')
export class RecordEntity {
    @PrimaryGeneratedColumn()
    record_id: number;
    @Column()
    record_url: string;
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