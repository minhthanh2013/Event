/* eslint-disable prettier/prettier */
import { ConferenceEntity } from 'src/conference/models/conference.entity';
import { HostEntity } from 'src/host/models/host.entity';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity("ComboSession")
export class ComboSessionEntity {
  @PrimaryGeneratedColumn()
  combo_id: number;
  @OneToOne(() => HostEntity, (host) => host.host_id)
  host: HostEntity;
  @Column()
  total_ticket: number;
  @OneToMany(() => ConferenceEntity, (conference) => conference.host)
  conferences: ConferenceEntity[];
}
