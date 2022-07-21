/* eslint-disable prettier/prettier */
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Ticket } from './models/ticket.interface';
import { TicketService } from './ticket.service';

@Processor('ticket')
export class TicketProcessor {
  constructor(private ticketService: TicketService) {}

  @Process('create')
  async handleBuyTicket(job: Job) {
    const ticket: Ticket =  {} as Ticket;
    ticket.ticket_id = job.data.ticketBody.ticket_id;
    ticket.buyer_id = job.data.ticketBody.buyer_id;
    ticket.conference_id = job.data.ticketBody.conference_id;
    ticket.payment_id = job.data.ticketBody.payment_id;
    console.log('create ticket');
    await this.ticketService.create(ticket);
  }
}
