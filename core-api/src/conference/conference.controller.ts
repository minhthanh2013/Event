/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { limits } from 'argon2';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ConferenceService } from './conference.service';
import { ConferenceRequestDto, ConferenceResponseDto } from './models/conference.dto';
import { Conference } from './models/conference.interface';

@Controller('conference')
export class ConferenceController {
  constructor(private conferenceService: ConferenceService) { }

  @Get()
  findAll(): Observable<ConferenceResponseDto[]> {
    return this.conferenceService.findAllConferences();
  }
  @Get('/:id')
  findOne(@Param('id') id: string): Observable<ConferenceResponseDto> {
    return this.conferenceService.findOne(+id);
  }
  @Post('/create-new')
  create(@Body() conference: ConferenceRequestDto): Observable<ConferenceResponseDto> {
    return this.conferenceService.createConference(conference);
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body() conference: ConferenceRequestDto): Observable<Boolean> {
    return this.conferenceService.update(+id, conference);
  }
  @Delete(':id')
  remove(@Param('id') id: number): Observable<Boolean> {
    return this.conferenceService.remove(+id);
  }
  @Get('/list-conference-banner/:limit')
  findNumberOfConference(@Param('limit') limit: number): Observable<ConferenceResponseDto[]> {
    return this.conferenceService.getNumberOfConference(+limit)
  }
}
