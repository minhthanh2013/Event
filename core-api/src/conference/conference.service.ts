/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
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
  findOne(id: number): Observable<Conference> {
    return from(this.conferenceRepository.findOne({where: {conference_id: id}}));
  }
  createConference(conference: Conference): Observable<Conference> {
    return from(this.conferenceRepository.save({
      isValidated: true,
      ...conference,
    }));
  }
  update(id: number, conference: Conference): Observable<UpdateResult> {
    return from(this.conferenceRepository.update(id, conference));
  }
  remove(id: number): Observable<DeleteResult> {
    return from(this.conferenceRepository.delete(id));
  }
}
