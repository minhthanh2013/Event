/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConferenceService } from './conference.service';
import { ConferenceController } from './conference.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConferenceEntity } from './models/conference.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConferenceEntity])],
  providers: [ConferenceService],
  controllers: [ConferenceController],
})
export class ConferenceModule {}
