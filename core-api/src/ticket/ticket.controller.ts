import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Ticket } from './models/ticket.interface';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Get()
  findAll(): Observable<Ticket[]> {
    return this.ticketService.findAll();
  }

  @Post()
  create(@Body() ticket: Ticket): Observable<Ticket> {
    return this.ticketService.create(ticket);
  }
}
