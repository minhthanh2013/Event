/* eslint-disable prettier/prettier */
import { AnalyticEntity } from 'src/analytic/models/analytic.entity';
import { ComboSessionEntity } from 'src/combosession/models/combo_session.entiy';
import { ConferenceCategoryEntity } from 'src/conferencecategory/models/conference_category.entity';
import { ConferenceTypeEntity } from 'src/conferencetype/models/conference_type.entity';
import { HostEntity } from 'src/host/models/host.entity';
import { SpeakerEntity } from 'src/speaker/models/speaker.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Conference')
export class ConferenceEntity {
  @PrimaryGeneratedColumn()
  conference_id: number;
  @Column()
  conference_name: string;
  @Column()
  description: string;
  @Column()
  address: string;
  @Column()
  date_start_conference: Date;
  @Column()
  date_start_sell: Date;
  @Column()
  date_end_sell: Date;
  @Column()
  date_end_conference: Date;
  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  create_at: Date;
  @CreateDateColumn({
    name: 'update_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  update_at: Date;
  @ManyToOne(() => HostEntity, host => host.conferences)
  host: HostEntity;
  @Column({ default: false })
  isValidated: boolean;
  @OneToOne(
    () => ConferenceTypeEntity,
    (conferenceType) => conferenceType.type_id,
  )
  conference_type: ConferenceTypeEntity;
  @OneToOne(
    () => ConferenceCategoryEntity,
    (conferenceCategory) => conferenceCategory.category_id,
  )
  conference_category: ConferenceCategoryEntity;
  @OneToOne(() => AnalyticEntity, (analytic) => analytic.analytic_id)
  analytic_detail: AnalyticEntity;
  @ManyToOne(() => ComboSessionEntity, (session) => session.conferences)
  comboSession: ComboSessionEntity;
  @ManyToOne(() => SpeakerEntity, (speaker) => speaker.conferences)
  speaker: SpeakerEntity;
  @Column('float')
  price: number;
}
