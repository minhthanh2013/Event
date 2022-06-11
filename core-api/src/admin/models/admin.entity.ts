import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Admin')
export class AdminEntity {
  @PrimaryGeneratedColumn()
  admin_id: number;
  @Column()
  user_name: string;
  @Column()
  password: string;
  @Column()
  email: string;
}
