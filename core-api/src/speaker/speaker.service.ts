/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { SpeakerEntity } from './models/speaker.entity';
import { Speaker } from './models/speaker.interface';

@Injectable()
export class SpeakerService {
  constructor(
    @InjectRepository(SpeakerEntity)
    private readonly speakerRepository: Repository<SpeakerEntity>,
  ) {}

  findAllSpeakers(): Observable<Speaker[]> {
    return from(this.speakerRepository.find());
  }

  findOne(id: string): Observable<Speaker> {
    return from(this.speakerRepository.findOne({where: {user_id: id}}));
  }

  createSpeaker(speaker: Speaker): Observable<Speaker> {
    return from(this.speakerRepository.save(speaker));
  }

  update(id: number, speaker: Speaker): Observable<UpdateResult> {
    return from(this.speakerRepository.update(id, speaker));
  }

  remove(id: number): Observable<DeleteResult> {
    return from(this.speakerRepository.delete(id));
  }
}
