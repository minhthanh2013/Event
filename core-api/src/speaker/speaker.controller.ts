/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Speaker } from './models/speaker.interface';
import { SpeakerService } from './speaker.service';

@Controller('speaker')
export class SpeakerController {
  constructor(private speakerService: SpeakerService) {}
}
