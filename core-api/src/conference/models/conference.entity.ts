/* eslint-disable prettier/prettier */
import { AdminEntity } from 'src/admin/models/admin.entity';
import { AnalyticEntity } from 'src/analytic/models/analytic.entity';
import { ComboSessionEntity } from 'src/combosession/models/combo_session.entity';
import { ConferenceCategoryEntity } from 'src/conferencecategory/models/conference_category.entity';
import { ConferenceTypeEntity } from 'src/conferencetype/models/conference_type.entity';
import { HostEntity } from 'src/host/models/host.entity';
import { SpeakerEntity } from 'src/speaker/models/speaker.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
  @Column({ default: false })
  isValidated: boolean;

  @Column()
  conference_type: number;
  @OneToOne(
    () => ConferenceTypeEntity,
    (conferenceType) => conferenceType.type_id,
  )
  @JoinColumn({
    name: 'conference_type',
    referencedColumnName: 'type_id',
  })
  conferenceType: ConferenceTypeEntity;

  @Column()
  conference_category: number;
  @OneToOne(
    () => ConferenceCategoryEntity,
    (conferenceCategory) => conferenceCategory.category_id,
  )
  @JoinColumn({
    name: 'conference_category',
    referencedColumnName: 'category_id',
  })
  conferenceCategory: ConferenceCategoryEntity;

  @Column()
  analytic_detail: number;

  @OneToOne(() => AnalyticEntity, (analytic) => analytic.analytic_id)
  @JoinColumn({
    name: 'analytic_detail',
    referencedColumnName: 'analytic_id',
  })
  analyticDetail: AnalyticEntity;

  @Column()
  admin_id: number;
  
  @OneToOne(() => AdminEntity, (admin) => admin.admin_id)
  @JoinColumn({
    name: 'admin_id',
    referencedColumnName: 'admin_id',
  })
  adminId: AdminEntity;

  @Column()
  combo_id: number;
  @ManyToOne(() => ComboSessionEntity, (session) => session.conferences)
  @JoinColumn({
    name: "combo_id",
    referencedColumnName: "combo_id"
  })
  comboSession: ComboSessionEntity;

  @Column()
  speaker_id: number;
  @ManyToOne(() => SpeakerEntity, (speaker) => speaker.conferences)
  @JoinColumn({
    name: "speaker_id",
    referencedColumnName: "conference_id"
  })
  speaker: SpeakerEntity;

  @Column()
  host_id: number
  @ManyToOne(() => HostEntity, host => host.conferences)
  @JoinColumn({
    name: "host_id",
    referencedColumnName: "host_id"
  })
  host: HostEntity;
  @Column({type: 'float', default: 0})
  price: number;
  @Column({type: 'int'})
  ticket_quantity: number;
  @Column({type: 'int'})
  current_quantity: number;
  @Column()
  status_ticket: string;
  @Column()
  organizer_name: string;
  @Column()
  zoom_meeting_id: string;
}
