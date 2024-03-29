/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SpeakerService } from './speaker.service';
import { SpeakerController } from './speaker.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeakerEntity } from './models/speaker.entity';
import { ConferenceEntity } from 'src/conference/models/conference.entity';
@Module({
  imports: [TypeOrmModule.forFeature([SpeakerEntity, ConferenceEntity])],
  providers: [SpeakerService],
  controllers: [SpeakerController],
})
export class SpeakerModule {}
