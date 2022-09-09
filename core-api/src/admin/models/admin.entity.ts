/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('Admin')
export class AdminEntity {
  @PrimaryGeneratedColumn('increment')
  admin_id: string;
  @Column({
    name: 'user_name',
  })
  user_name: string;
  @Column({
    name: 'password',
  })
  password: string;
  @Column({
    name: 'email',
  })
  email: string;
}
