/* eslint-disable prettier/prettier */
import { ConferenceEntity } from "src/conference/models/conference.entity";
import { SubscriptionEntity } from "src/subscription/models/subscription.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity('Host')
export class HostEntity {
  @PrimaryGeneratedColumn()
  host_id: number;
  @Column()
  user_name: string;
  @Column()
  password: string;
  @Column()
  email: string;
  @Column()
  first_name: string;
  @Column()
  last_name: string;
  @CreateDateColumn({ type: 'timestamp without time zone', default: () => 'NOW()' })
  create_at: Date;
  @CreateDateColumn({ type: 'timestamp without time zone', default: () => 'NOW()' })
  update_at: Date;
  @OneToMany(() => ConferenceEntity, conference => conference.host)
  conferences: ConferenceEntity[]
  @OneToMany(() => SubscriptionEntity, (subscription) => subscription.host)
  subscriptions: SubscriptionEntity[]
}
