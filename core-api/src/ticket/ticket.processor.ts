/* eslint-disable prettier/prettier */
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { TicketService } from './ticket.service';

@Processor('ticket')
export class TicketProcessor {
  constructor(private ticketService: TicketService) {}

  @Process('create')
  async handleBuyTicket(job: Job) {
    console.log('create ticket');
    await this.ticketService.create(job.data);
  }
}
