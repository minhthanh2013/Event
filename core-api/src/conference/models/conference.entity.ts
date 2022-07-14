/* eslint-disable prettier/prettier */
import { type } from 'os';
import { AdminEntity } from 'src/admin/models/admin.entity';
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
  @OneToOne(
    () => ConferenceTypeEntity,
    (conferenceType) => conferenceType.type_id,
  )
  @JoinColumn({
    name: 'conference_type',
    referencedColumnName: 'type_id',
  })
  conference_type: ConferenceTypeEntity;
  @OneToOne(
    () => ConferenceCategoryEntity,
    (conferenceCategory) => conferenceCategory.category_id,
  )
  @JoinColumn({
    name: 'conference_category',
    referencedColumnName: 'category_id',
  })
  conference_category: ConferenceCategoryEntity;
  @OneToOne(() => AnalyticEntity, (analytic) => analytic.analytic_id)
  analytic_detail: AnalyticEntity;
  @OneToOne(() => AdminEntity, (admin) => admin.admin_id)
  @JoinColumn({
    name: 'admin_id',
    referencedColumnName: 'admin_id',
  })
  admin_id: AdminEntity;
  @ManyToOne(() => ComboSessionEntity, (session) => session.conferences)
  @JoinColumn({
    name: "combo_id",
    referencedColumnName: "combo_id"
  })
  comboSession: ComboSessionEntity;
  @ManyToOne(() => SpeakerEntity, (speaker) => speaker.conferences)
  @JoinColumn({
    name: "speaker_id",
    referencedColumnName: "user_id"
  })
  speaker: SpeakerEntity;
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
}
