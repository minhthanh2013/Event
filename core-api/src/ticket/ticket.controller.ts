/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Ticket } from './models/ticket.interface';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Get()
  findAll(): Observable<Ticket[]> {
    return this.ticketService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Observable<Ticket> {
    return this.ticketService.findOne(+id);
  }
  @Post()
  create(@Body() ticket: Ticket): Observable<Ticket> {
    return this.ticketService.create(ticket);
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body() ticket: Ticket): Observable<UpdateResult> {
    return this.ticketService.update(+id, ticket);
  }
  @Delete(':id')
  remove(@Param('id') id: number): Observable<DeleteResult> {
    return this.ticketService.remove(+id);
  }
}
