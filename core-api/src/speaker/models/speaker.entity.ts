/* eslint-disable prettier/prettier */
import { ConferenceEntity } from 'src/conference/models/conference.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Speaker')
export class SpeakerEntity {
  @PrimaryGeneratedColumn()
  user_id: number;
  @OneToMany(() => ConferenceEntity, (conference) => conference.speaker)
  conferences: ConferenceEntity[];
  @Column()
  is_accepted: boolean;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_join: Date;
}
