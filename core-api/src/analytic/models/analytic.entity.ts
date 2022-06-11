import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Analytic')
export class AnalyticEntity {
  @PrimaryGeneratedColumn()
  analytic_id: number;
  @Column()
  number_ticket_bought: number;
  @Column()
  num_attende: number;
}
