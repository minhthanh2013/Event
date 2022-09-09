/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { ResponseData } from 'src/responsedata/response-data.dto';
import { ConferencetypeService } from './conferencetype.service';

@Controller('conferencetype')
export class ConferencetypeController {
  constructor(private conferenceTypeService: ConferencetypeService) {}

  @Get('/get-all')
  findAll(): Observable<ResponseData> {
    return from(this.conferenceTypeService.findAllConferenceTypes());
  }
}
