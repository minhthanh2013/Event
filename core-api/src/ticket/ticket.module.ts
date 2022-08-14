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
import { EmailModule } from './../email/email.module';
import { EmailService } from './../email/email.service';
import { ComboSessionEntity } from 'src/combosession/models/combo_session.entity';

@Module({
  imports: [
    EmailModule,
    BullModule.registerQueue({
      name: 'ticket',
    }),
    TypeOrmModule.forFeature([TicketEntity, UserEntity, ConferenceEntity, PaymentEntity, ComboSessionEntity]),
  ],
  controllers: [TicketController],
  providers: [TicketService, TicketProcessor, EmailService], 
})
export class TicketModule {}
