import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
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

  createConferenceCategory(
    conferenceCategory: ConferenceCategory,
  ): Observable<ConferenceCategory> {
    return from(this.conferenceCategoryRepository.save(conferenceCategory));
  }
}
