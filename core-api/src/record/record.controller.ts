import { HostRecordRequest } from './models/retcord.interface';
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ResponseData } from 'src/responsedata/response-data.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Record, UserRecordRequest } from './models/retcord.interface';
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
  @Post('check-valid-user-buy-record') 
  checkValidUserBuyRecord(@Body() body: UserRecordRequest): Promise<ResponseData> {
    return this.recordService.checkValidUserBuyRecord(body);
  }
  @Post('check-valid-host-own-record') 
  checkValidHostBuyRecord(@Body() body: HostRecordRequest): Promise<ResponseData> {
    return this.recordService.checkValidHostBuyRecord(body);
  }
}
