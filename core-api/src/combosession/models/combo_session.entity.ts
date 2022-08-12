/* eslint-disable prettier/prettier */
import { ConferenceEntity } from 'src/conference/models/conference.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity("ComboSession")
export class ComboSessionEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  combo_id: number;
  @Column()
  conference_id: number
  @OneToMany(() => ConferenceEntity, (conference) => conference.comboSession)
  conferences: ConferenceEntity[];
  @Column()
  combo_name: string;
  @Column()
  combo_description: string;
  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  create_at: Date;
  @Column()
  discount: number;
}
