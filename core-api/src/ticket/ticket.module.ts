import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketEntity } from './models/ticket.entity';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { BullModule } from '@nestjs/bull';
import { TicketProcessor } from './ticket.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'ticket',
    }),
    TypeOrmModule.forFeature([TicketEntity]),
  ],
  controllers: [TicketController],
  providers: [TicketService, TicketProcessor],
})
export class TicketModule {}
