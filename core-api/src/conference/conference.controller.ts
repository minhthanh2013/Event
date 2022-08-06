/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { ResponseData } from 'src/responsedata/response-data.dto';
import { ConferenceService } from './conference.service';
import { ConferenceRequestDto } from './models/conference.dto';

@Controller('conference')
export class ConferenceController {
  constructor(private conferenceService: ConferenceService) { }

  @Get()
  findAll(): Observable<ResponseData> {
    return from(this.conferenceService.findAllConferences());
  }
  @Get('/:id')
  findOne(@Param('id') id: string): Observable<ResponseData> {
    return from(this.conferenceService.findOne(+id));
  }
  @Post('/create-new')
  create(@Body() conference: ConferenceRequestDto): Observable<ResponseData> {
    return from(this.conferenceService.createConference(conference));
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body() conference: ConferenceRequestDto): Observable<ResponseData> {
    return from(this.conferenceService.update(+id, conference));
  }
  @Delete(':id')
  remove(@Param('id') id: number): Observable<ResponseData> {
    return from(this.conferenceService.remove(+id));
  }
  @Get('/list-conference-banner/:limit')
  findNumberOfConference(@Param('limit') limit: number): Observable<ResponseData> {
    return from(this.conferenceService.getNumberOfConference(+limit));
  }
  @Get('/get-host-event')
  findHostEvent(@Body('id') id: number): Observable<ResponseData> {
    return from(this.conferenceService.getHostEvent(+id));
  }
  @Get('/get-x-conferences/:limit')
  findLatestXConferences(@Param('limit') limit: number): Observable<ResponseData> {
    return from(this.conferenceService.getLatestXConferences(+limit));
  }
}
