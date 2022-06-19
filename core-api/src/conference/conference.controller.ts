/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ConferenceService } from './conference.service';
import { Conference } from './models/conference.interface';

@Controller('conference')
export class ConferenceController {
  constructor(private conferenceService: ConferenceService) {}

  @Get()
  findAll(): Observable<Conference[]> {
    return this.conferenceService.findAllConferences();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Observable<Conference> {
    return this.conferenceService.findOne(+id);
  }
  @Post()
  create(@Body() conference: Conference): Observable<Conference> {
    return this.conferenceService.createConference(conference);
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body() conference: Conference): Observable<UpdateResult> {
    return this.conferenceService.update(+id, conference);
  }
  @Delete(':id')
  remove(@Param('id') id: number): Observable<DeleteResult> {
    return this.conferenceService.remove(+id);
  }
}
