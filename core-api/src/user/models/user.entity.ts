/* eslint-disable prettier/prettier */
import { IsEmail } from 'class-validator';
import { PopularityEntity } from 'src/popularity/Model/popularity.entity';
import { TicketEntity } from 'src/ticket/models/ticket.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: number;
  @Column()
  user_name: string;
  @Column()
  password: string;
  @Column()
  @IsEmail()
  email: string;
  @Column()
  first_name: string;
  @Column()
  last_name: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_at: Date;
  @Column()
  update_at: Date;
  @OneToMany(() => TicketEntity, (ticket) => ticket.buyer)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'buyer_id',
  })
  tickets: TicketEntity[];
  @Column()
  balance: number;

  @OneToMany(() => PopularityEntity, (popular) => popular.viewer)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'user_id'
  })
  popularity: PopularityEntity[];
  @Column("text", {array: true})
  category: string[];
}
