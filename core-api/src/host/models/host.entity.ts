/* eslint-disable prettier/prettier */
import { Subscription } from "rxjs";
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
  @OneToMany(() => ConferenceEntity, (conference) => conference.host)
  conferences: ConferenceEntity[]
  @OneToMany(() => ConferenceEntity, (subscription) => subscription.host)
  subscriptions: SubscriptionEntity[]
}
