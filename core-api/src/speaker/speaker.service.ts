/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { SpeakerEntity } from './models/speaker.entity';
import { SpeakerResponseDto } from './models/speaker.interface';
import { ConferenceEntity } from 'src/conference/models/conference.entity';
@Injectable()
export class SpeakerService {
  constructor(
    @InjectRepository(SpeakerEntity)
    private readonly speakerRepository: Repository<SpeakerEntity>,
    @InjectRepository(ConferenceEntity)
    private readonly conferenceRepository: Repository<ConferenceEntity>
  ) {}
  async checkSpeakerByUuid(uuid: string): Promise<SpeakerResponseDto> {
    const speaker = await this.speakerRepository.findOne({
      where: {
        uuid: uuid
      }})
      if (!speaker) {
        return null;
      }
      const conference = await this.conferenceRepository.findOne({
        where: {
          conference_id: speaker.conference_id
        }});
        if (!conference) {
          return null;
        }
        return {
          speaker_name: speaker.speaker_name,
          speaker_email: speaker.speaker_email,
          zoom_meeting_id: conference.zoom_meeting_id
        }
  }
}
