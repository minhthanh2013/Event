/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
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
  findOne(id: number): Observable<Ticket> {
    return from(this.ticketRepository.findOne({where: {ticket_id: id}}));
  }
  create(ticket: Ticket): Observable<Ticket> {
    return from(this.ticketRepository.save(ticket));
  }
  update(id: number, ticket: Ticket): Observable<UpdateResult> {
    return from(this.ticketRepository.update(id, ticket));
  }
  remove(id: number): Observable<DeleteResult> {
    return from(this.ticketRepository.delete(id));
  }
}
