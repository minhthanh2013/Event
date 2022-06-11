import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm/repository/Repository';
import { RecordEntity } from './models/record.entity';
import { Record } from './models/retcord.interface';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(RecordEntity)
    private readonly recordRepository: Repository<RecordEntity>,
  ) {}
  findAllRecords(): Observable<Record[]> {
    return from(this.recordRepository.find());
  }
  createRecord(record: Record): Observable<Record> {
    return from(this.recordRepository.save(record));
  }
}