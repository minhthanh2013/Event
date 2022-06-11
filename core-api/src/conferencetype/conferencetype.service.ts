import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { Repository } from 'typeorm';
import { ConferenceTypeEntity } from './models/conference_type.entity';
import { ConferenceType } from './models/conference_type.interface';

@Injectable()
export class ConferencetypeService {
  constructor(
    @InjectRepository(ConferenceTypeEntity)
    private readonly conferenceTypeRepository: Repository<ConferenceTypeEntity>,
  ) {}

  findAllConferenceTypes(): Observable<ConferenceType[]> {
    return from(this.conferenceTypeRepository.find());
  }

  createConferenceType(
    conferenceType: ConferenceType,
  ): Observable<ConferenceType> {
    return from(this.conferenceTypeRepository.save(conferenceType));
  }
}
