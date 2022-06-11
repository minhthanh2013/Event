import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ConferenceType')
export class ConferenceTypeEntity {
  @PrimaryGeneratedColumn()
  type_id: number;
  @Column()
  type_name: string;
}
