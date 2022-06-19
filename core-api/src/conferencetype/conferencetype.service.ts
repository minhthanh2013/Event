/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
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
  findOne(id: number): Observable<ConferenceType> {
    return from(this.conferenceTypeRepository.findOne({where: {type_id: id}}));
  }
  createConferenceType(
    conferenceType: ConferenceType,
  ): Observable<ConferenceType> {
    return from(this.conferenceTypeRepository.save(conferenceType));
  }
  update(id: number, conferenceType: ConferenceType): Observable<UpdateResult> {
    return from(this.conferenceTypeRepository.update(id, conferenceType));
  }
  remove(id: number): Observable<DeleteResult> {
    return from(this.conferenceTypeRepository.delete(id));
  }
}
