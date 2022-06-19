/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Speaker } from './models/speaker.interface';
import { SpeakerService } from './speaker.service';

@Controller('speaker')
export class SpeakerController {
  constructor(private speakerService: SpeakerService) {}

  @Get()
  findAll(): Observable<Speaker[]> {
    return this.speakerService.findAllSpeakers();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Observable<Speaker> {
    return this.speakerService.findOne(id);
  }
  @Post()
  create(@Body() speaker: Speaker): Observable<Speaker> {
    return this.speakerService.createSpeaker(speaker);
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body() speaker: Speaker): Observable<UpdateResult> {
    return this.speakerService.update(+id, speaker);
  }
  @Delete(':id')
  remove(@Param('id') id: number): Observable<DeleteResult> {
    return this.speakerService.remove(+id);
  }
}
