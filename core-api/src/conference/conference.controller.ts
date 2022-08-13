/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  DefaultValuePipe,
  ParseIntPipe, 
  Query
} from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { ResponseData } from 'src/responsedata/response-data.dto';
import { ConferenceService } from './conference.service';
import { ConferenceRequestDto, SubmitConferenceRequestDto } from './models/conference.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ConferenceEntity } from './models/conference.entity';

@Controller('conference')
export class ConferenceController {
  constructor(private conferenceService: ConferenceService) {}

  @Get()
  findAll(): Observable<ResponseData> {
    return from(this.conferenceService.findAllConferences());
  }
  @Get('/filter')
  async indexTest(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(12), ParseIntPipe) limit = 12,
    @Query('search', new DefaultValuePipe('')) search = '',
  ): Promise<Pagination<ConferenceEntity>> {
    limit = limit > 100 ? 100 : limit;
    return this.conferenceService.paginate({
      page,
      limit,
      route: '/conference/filter',
    }, search);
  }
  @Get('/:id')
  findOne(@Param('id') id: string): Observable<ResponseData> {
    return from(this.conferenceService.findOne(+id));
  }
  @Post('/create-new')
  create(@Body() conference: ConferenceRequestDto): Observable<ResponseData> {
    return from(this.conferenceService.createConference(conference));
  }
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() conference: ConferenceRequestDto,
  ): Observable<ResponseData> {
    return from(this.conferenceService.update(+id, conference));
  }
  @Delete(':id')
  remove(@Param('id') id: number): Observable<ResponseData> {
    return from(this.conferenceService.remove(+id));
  }
  @Get('/list-conference-banner/:limit')
  findNumberOfConference(
    @Param('limit') limit: number,
  ): Observable<ResponseData> {
    return from(this.conferenceService.getNumberOfConference(+limit));
  }
  @Get('/get-host-event')
  findHostEvent(@Body('id') id: number): Observable<ResponseData> {
    return from(this.conferenceService.getHostEvent(+id));
  }
  @Get('/get-x-conferences/:limit')
  findLatestXConferences(
    @Param('limit') limit: number,
  ): Observable<ResponseData> {
    return from(this.conferenceService.getLatestXConferences(+limit));
  }
  @Get('/find-all-by-host-id/:id')
  getAllByHostId(@Param('id') id: number): Observable<ResponseData> {
    return from(this.conferenceService.findAllByHostId(+id));
  }
  @Get('/find-host-by-conference-id/:id')
  getByConfId(@Param('id') id: number): Promise<ResponseData> {
    return this.conferenceService.getHostDataByConferenceId(id);
  }
  @Get('/find-all-by-user-id/:id')
  getAllByUserId(@Param("id") id: number): Observable<ResponseData> {
    return from(this.conferenceService.findAllByUserId(id));
  }
  @Post('/submit-conference')
  submitConference(@Body() submitConference: SubmitConferenceRequestDto): Promise<ResponseData> {
    return this.conferenceService.submitConference(submitConference);
  }
}
