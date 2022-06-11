import { IsEmail } from 'class-validator';
import { TicketEntity } from 'src/ticket/models/ticket.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
  tickets: TicketEntity[];
}
