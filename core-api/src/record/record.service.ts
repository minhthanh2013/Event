import { TicketEntity } from './../ticket/models/ticket.entity';
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { ResponseData } from 'src/responsedata/response-data.dto';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { RecordEntity } from './models/record.entity';
import { Record, UserRecordRequest, HostRecordRequest } from './models/retcord.interface';
import { ConferenceEntity } from 'src/conference/models/conference.entity';
@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(RecordEntity)
    private readonly recordRepository: Repository<RecordEntity>,
    @InjectRepository(ConferenceEntity)
    private readonly confenreRepository: Repository<ConferenceEntity>,
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
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
  async checkValidUserBuyRecord(body: UserRecordRequest): Promise<ResponseData> {
    const response = new ResponseData();
    const ticket = await this.ticketRepository.findOne({where: {buyer_id: parseInt(body.user_id), conference_id: body.conference_id}});
    if(!ticket) {
      response.data = null;
      response.status = false;
      return response;
    }
    const conference = await this.confenreRepository.findOne({where: {conference_id: body.conference_id}});
    if(!conference) {
      response.data = null;
      response.status = false;
      return response;
    }
    if(conference.conference_type.toString() === '2' && !conference.isValidated && conference.isRecorded && conference.zoom_meeting_id !== null) {
      response.data = null;
      response.status = true;
      return response;
    } 
    response.data = null;
    response.status = false;
    return response;
  }

  async checkValidHostBuyRecord(body: HostRecordRequest): Promise<ResponseData> {
    const response = new ResponseData();
    const conference = await this.confenreRepository.findOne({where: {conference_id: body.conference_id, host_id: parseInt(body.host_id)}});
    if(!conference) {
      response.data = null;
      response.status = false;
      return response;
    }
    if(conference.conference_type.toString() === '2' && !conference.isValidated && conference.isRecorded && conference.zoom_meeting_id !== null) {
      response.data = null;
      response.status = true;
      return response;
    }
    response.data = null;
    response.status = false;
    return response;
  }
}
