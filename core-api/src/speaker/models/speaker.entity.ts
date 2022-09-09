/* eslint-disable prettier/prettier */
import { ConferenceEntity } from 'src/conference/models/conference.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Speaker')
export class SpeakerEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  uuid: string;
  @Column()
  speaker_name: string;
  @Column()
  speaker_email: string;
  @Column()
  conference_id: number;
  @JoinColumn({
    name: "conference_id",
    referencedColumnName: "speaker_id"
  })
  @OneToMany(() => ConferenceEntity, (conference) => conference.speaker)
  conferences: ConferenceEntity[];
  @Column()
  is_accepted: boolean;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_join: Date;
}
