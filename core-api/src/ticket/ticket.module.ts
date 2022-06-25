/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketEntity } from './models/ticket.entity';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { BullModule } from '@nestjs/bull';
import { TicketProcessor } from './ticket.processor';
import { UserEntity } from 'src/user/models/user.entity';
import { ConferenceEntity } from 'src/conference/models/conference.entity';
import { PaymentEntity } from 'src/payment/models/payment.entity';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'ticket',
    }),
    TypeOrmModule.forFeature([TicketEntity, UserEntity, ConferenceEntity, PaymentEntity]),
  ],
  controllers: [TicketController],
  providers: [TicketService, TicketProcessor], 
})
export class TicketModule {}
