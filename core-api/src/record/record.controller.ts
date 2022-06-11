import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Record } from './models/retcord.interface';
import { RecordService } from './record.service';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}
  @Get()
  findAll(): Observable<Record[]> {
    return this.recordService.findAllRecords();
  }
  @Post()
  create(@Body() record: Record): Observable<Record> {
    return this.recordService.createRecord(record);
  }
}
