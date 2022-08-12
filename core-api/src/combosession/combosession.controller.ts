/* eslint-disable prettier/prettier */
import { ComboSessionEntity } from './models/combo_session.entiy';
import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Observable } from 'rxjs';
import { ResponseData } from 'src/responsedata/response-data.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CombosessionService } from './combosession.service';
import { ComboSession } from './models/combo_session.interface';

@Controller('combosession')
export class CombosessionController {
  constructor(private comboSessionService: CombosessionService) {}
  // Note: This is a temporary solution to get the data from the database.
  @Get("id")
  getCombo(@Param('id') comboId: number): Promise<ResponseData> {
    return this.comboSessionService.findAllSessionsBySessionId(comboId);
  }
  @Get()
  findAll(): Observable<ComboSession[]> {
    return this.comboSessionService.findAllSessions();
  }
  @Get('/filter')
  async indexTest(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(12), ParseIntPipe) limit = 12,
    @Query('search', new DefaultValuePipe('')) search = '',
  ): Promise<Pagination<ComboSessionEntity>> {
    limit = limit > 100 ? 100 : limit;
    return this.comboSessionService.paginate({
      page,
      limit,
      route: '/combosession/filter',
    }, search);
  }
  @Get("/latest-x-combos/:limit")
  getLatestXCombos(@Param('limit') limit: number): Promise<ResponseData> {
    return this.comboSessionService.getLatestXCombos(+limit);
  }
  @Post()
  create(@Body() comboSession: ComboSession): Observable<ComboSession> {
    return this.comboSessionService.createSession(comboSession);
  }

  @Patch('id')
  update(@Param('id') id: number, @Body() comboSession: ComboSession): Observable<UpdateResult> {
    return this.comboSessionService.update(+id, comboSession);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Observable<DeleteResult> {
    return this.comboSessionService.remove(+id);
  } 
  @Get('/find-combo-by-host-id/:id')
  getComboByHostId(@Param("id") id: number): Promise<ResponseData> {
    return this.comboSessionService.getComboByHostId(+id);
  }
}
