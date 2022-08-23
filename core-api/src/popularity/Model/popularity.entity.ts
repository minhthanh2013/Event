/* eslint-disable prettier/prettier */
import { ConferenceEntity } from 'src/conference/models/conference.entity';
import { UserEntity } from 'src/user/models/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';


@Entity('Popularity')
export class PopularityEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  viewer_id: number;
  @ManyToOne(() => UserEntity, (user) => user.popularity)
  @JoinColumn({
    name: "viewer_id",
    referencedColumnName: "user_id"
  })
  viewer: UserEntity;
  @Column()
  conference_id: number
  @ManyToOne(() => ConferenceEntity, (conference) => conference.popularity)
  @JoinColumn({
    name: "conference_id",
    referencedColumnName: "conference_id"
  })
  conference: ConferenceEntity;
}
