import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ConferenceCategory')
export class ConferenceCategoryEntity {
  @PrimaryGeneratedColumn()
  category_id: number;
  @Column()
  category_name: string;
}
