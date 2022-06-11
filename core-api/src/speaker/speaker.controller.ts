import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Speaker } from './models/speaker.interface';
import { SpeakerService } from './speaker.service';

@Controller('speaker')
export class SpeakerController {
  constructor(private speakerService: SpeakerService) {}

  @Get()
  findAll(): Observable<Speaker[]> {
    return this.speakerService.findAllSpeakers();
  }

  @Post()
  create(@Body() speaker: Speaker): Observable<Speaker> {
    return this.speakerService.createSpeaker(speaker);
  }
}
