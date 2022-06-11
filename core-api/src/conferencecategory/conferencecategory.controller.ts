import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConferencecategoryService } from './conferencecategory.service';
import { ConferenceCategory } from './models/conference_category.interface';

@Controller('conferencecategory')
export class ConferencecategoryController {
  constructor(private conferenceCategoryService: ConferencecategoryService) {}

  @Get()
  findAll(): Observable<ConferenceCategory[]> {
    return this.conferenceCategoryService.findAllConferenceCategories();
  }

  @Post()
  create(
    @Body() conferenceCategory: ConferenceCategory,
  ): Observable<ConferenceCategory> {
    return this.conferenceCategoryService.createConferenceCategory(
      conferenceCategory,
    );
  }
}
