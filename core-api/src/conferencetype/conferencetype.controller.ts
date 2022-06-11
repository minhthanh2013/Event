import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConferencetypeService } from './conferencetype.service';
import { ConferenceType } from './models/conference_type.interface';

@Controller('conferencetype')
export class ConferencetypeController {
  constructor(private conferenceTypeService: ConferencetypeService) {}

  @Get()
  findAll(): Observable<ConferenceType[]> {
    return this.conferenceTypeService.findAllConferenceTypes();
  }

  @Post()
  create(@Body() conferenceType: ConferenceType): Observable<ConferenceType> {
    return this.conferenceTypeService.createConferenceType(conferenceType);
  }
}
