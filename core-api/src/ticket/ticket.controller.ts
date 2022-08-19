/* eslint-disable prettier/prettier */
import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { Observable } from 'rxjs';
import { UpdateResult, DeleteResult } from 'typeorm';
import { BuySessionDto, Ticket } from './models/ticket.interface';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(
    private ticketService: TicketService,
    @InjectQueue('ticket') private ticketQueue: Queue) {}

  @Get()
  findAll(): Observable<Ticket[]> {
    return this.ticketService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string): Observable<Ticket> {
    return this.ticketService.findOne(+id);
  }

  @Post()
  async create(@Body() ticket: Ticket) {
    console.log('Added to queue')
    await this.ticketQueue.add('create', {
      ticketBody: ticket
    })
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body() ticket: Ticket): Observable<UpdateResult> {
    return this.ticketService.update(+id, ticket);
  }
  @Delete(':id')
  remove(@Param('id') id: number): Observable<DeleteResult> {
    return this.ticketService.remove(+id);
  }
  @Post('buy-session')
  async buySession(@Body() session: BuySessionDto) {
    console.log('Added to queue to buy session')
    await this.ticketQueue.add('buysession', {
      sessionDto: session
    })
  }
}
