import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { ConferenceEntity } from './models/conference.entity';
import { Conference } from './models/conference.interface';

@Injectable()
export class ConferenceService {
  constructor(
    @InjectRepository(ConferenceEntity)
    private readonly conferenceRepository: Repository<ConferenceEntity>,
  ) {}

  findAllConferences(): Observable<Conference[]> {
    return from(this.conferenceRepository.find());
  }

  createConference(conference: Conference): Observable<Conference> {
    return from(this.conferenceRepository.save(conference));
  }
}
