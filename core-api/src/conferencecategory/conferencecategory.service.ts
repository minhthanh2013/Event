/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ConferenceCategoryEntity } from './models/conference_category.entity';
import { ConferenceCategory } from './models/conference_category.interface';

@Injectable()
export class ConferencecategoryService {
  constructor(
    @InjectRepository(ConferenceCategoryEntity)
    private readonly conferenceCategoryRepository: Repository<ConferenceCategoryEntity>,
  ) {}

  findAllConferenceCategories(): Observable<ConferenceCategory[]> {
    return from(this.conferenceCategoryRepository.find());
  }
  findOne(id: number): Observable<ConferenceCategory> {
    return from(this.conferenceCategoryRepository.findOne({where: {category_id: id}}));
  }
  createConferenceCategory(
    conferenceCategory: ConferenceCategory,
  ): Observable<ConferenceCategory> {
    return from(this.conferenceCategoryRepository.save(conferenceCategory));
  }
  update(id: number, conferenceCategory: ConferenceCategory): Observable<UpdateResult> {
    return from(this.conferenceCategoryRepository.update(id, conferenceCategory));
  }
  remove(id: number): Observable<DeleteResult> {
    return from(this.conferenceCategoryRepository.delete(id));
  }
}
