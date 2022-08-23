import { TicketEntity } from 'src/ticket/models/ticket.entity';
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordEntity } from './models/record.entity';
import { ConferenceEntity } from 'src/conference/models/conference.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecordEntity, ConferenceEntity, TicketEntity])],
  providers: [RecordService],
  controllers: [RecordController],
})
export class RecordModule {}
