import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { TicketEntity } from './models/ticket.entity';
import { Ticket } from './models/ticket.interface';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
  ) {}

  findAll(): Observable<Ticket[]> {
    return from(this.ticketRepository.find());
  }

  create(ticket: Ticket): Observable<Ticket> {
    return from(this.ticketRepository.save(ticket));
  }
}
