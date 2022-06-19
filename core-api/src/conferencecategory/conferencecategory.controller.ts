/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UpdateResult, DeleteResult } from 'typeorm';
import { ConferencecategoryService } from './conferencecategory.service';
import { ConferenceCategory } from './models/conference_category.interface';

@Controller('conferencecategory')
export class ConferencecategoryController {
  constructor(private conferenceCategoryService: ConferencecategoryService) {}

  @Get()
  findAll(): Observable<ConferenceCategory[]> {
    return this.conferenceCategoryService.findAllConferenceCategories();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Observable<ConferenceCategory> {
    return this.conferenceCategoryService.findOne(+id);
  }
  @Post()
  create(
    @Body() conferenceCategory: ConferenceCategory,
  ): Observable<ConferenceCategory> {
    return this.conferenceCategoryService.createConferenceCategory(
      conferenceCategory,
    );
  }
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() conferenceCategory: ConferenceCategory,
  ): Observable<UpdateResult> {
    return this.conferenceCategoryService.update(+id, conferenceCategory);
  }
  @Delete(':id')
  remove(@Param('id') id: number): Observable<DeleteResult> {
    return this.conferenceCategoryService.remove(+id);
  }
}
