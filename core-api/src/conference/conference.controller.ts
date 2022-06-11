import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConferenceService } from './conference.service';
import { Conference } from './models/conference.interface';

@Controller('conference')
export class ConferenceController {
  constructor(private conferenceService: ConferenceService) {}

  @Get()
  findAll(): Observable<Conference[]> {
    return this.conferenceService.findAllConferences();
  }

  @Post()
  create(@Body() conference: Conference): Observable<Conference> {
    return this.conferenceService.createConference(conference);
  }
}
