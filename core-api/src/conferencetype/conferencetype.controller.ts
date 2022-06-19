/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UpdateResult, DeleteResult } from 'typeorm';
import { ConferencetypeService } from './conferencetype.service';
import { ConferenceType } from './models/conference_type.interface';

@Controller('conferencetype')
export class ConferencetypeController {
  constructor(private conferenceTypeService: ConferencetypeService) {}

  @Get()
  findAll(): Observable<ConferenceType[]> {
    return this.conferenceTypeService.findAllConferenceTypes();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Observable<ConferenceType> {
    return this.conferenceTypeService.findOne(+id);
  }
  @Post()
  create(@Body() conferenceType: ConferenceType): Observable<ConferenceType> {
    return this.conferenceTypeService.createConferenceType(conferenceType);
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body() conferenceType: ConferenceType): Observable<UpdateResult> {
    return this.conferenceTypeService.update(+id, conferenceType);
  }
  @Delete(':id')
  remove(@Param('id') id: number): Observable<DeleteResult> {
    return this.conferenceTypeService.remove(+id);
  }
}
