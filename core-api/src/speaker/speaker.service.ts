/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { SpeakerEntity } from './models/speaker.entity';
import { Speaker } from './models/speaker.interface';

@Injectable()
export class SpeakerService {
  constructor(
    @InjectRepository(SpeakerEntity)
    private readonly speakerRepository: Repository<SpeakerEntity>,
  ) {}
}
