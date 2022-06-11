import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
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

  createSpeaker(speaker: Speaker): Observable<Speaker> {
    return from(this.speakerRepository.save(speaker));
  }
}
