/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Record } from './models/retcord.interface';
import { RecordService } from './record.service';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}
  @Get()
  findAll(): Observable<Record[]> {
    return this.recordService.findAllRecords();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Observable<Record> {
    return this.recordService.findOne(+id);
  }
  @Post()
  create(@Body() record: Record): Observable<Record> {
    return this.recordService.createRecord(record);
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body() record: Record): Observable<UpdateResult> {
    return this.recordService.update(+id, record);
  }
  @Delete(':id')
  remove(@Param('id') id: number): Observable<DeleteResult> {
    return this.recordService.remove(+id);
  }
}
