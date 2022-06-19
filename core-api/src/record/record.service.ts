/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { UpdateResult, DeleteResult } from 'typeorm';
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
  findOne(id: number): Observable<Record> {
    return from(this.recordRepository.findOne({where: {record_id: id}}));
  }
  createRecord(record: Record): Observable<Record> {
    return from(this.recordRepository.save(record));
  }
  update(id: number, record: Record): Observable<UpdateResult> {
    return from(this.recordRepository.update(id, record));
  }
  remove(id: number): Observable<DeleteResult> {
    return from(this.recordRepository.delete(id));
  }
}
