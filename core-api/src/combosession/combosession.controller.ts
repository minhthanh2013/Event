/* eslint-disable prettier/prettier */
import { ComboSessionEntity } from './models/combo_session.entity';
import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Observable } from 'rxjs';
import { ResponseData } from 'src/responsedata/response-data.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CombosessionService } from './combosession.service';
import { ComboSession } from './models/combo_session.interface';
import { ComboSessionRequestDto } from './models/combo_session.dto';

@Controller('combosession')
export class CombosessionController {
  constructor(private comboSessionService: CombosessionService) {}
  // Note: This is a temporary solution to get the data from the database.
  @Get()
  findAll(): Observable<ComboSession[]> {
    return this.comboSessionService.findAllSessions();
  }
  @Get(":id")
  getCombo(@Param('id') comboId: number): Promise<ResponseData> {
    return this.comboSessionService.findAllSessionsBySessionId(comboId);
  }
  @Get("/latest-x-combos/:limit")
  getLatestXCombos(@Param('limit') limit: number): Promise<ResponseData> {
    return this.comboSessionService.getLatestXCombos(+limit);
  }
  @Post()
  create(@Body() comboRequestDto: ComboSessionRequestDto) {
    return this.comboSessionService.createSession(comboRequestDto);
  }

  @Patch('id')
  update(@Param('id') id: number, @Body() comboSession: ComboSession): Observable<UpdateResult> {
    return this.comboSessionService.update(+id, comboSession);
  }

  @Delete(':id')
  remove(@Param('id') id: number): ResponseData {
    return this.comboSessionService.remove(+id);
  } 
  @Get('find-combo-by-host-id/:id')
  getComboByHostId(
    @Param("id") id: number,  
    @Query('revenue', new DefaultValuePipe('')) isRevenue = '',): Promise<ResponseData> {
    return this.comboSessionService.getComboByHostId(+id, isRevenue);
  }
  @Get('find-combo-by-user-id/:id')
  getComboByUserId(@Param("id") id: number) {
    return this.comboSessionService.getComboByUserId(+id);
  }
  @Get('find-combo-revenue-by-id/:id')
  getComboRevenueById(@Param("id") id: number) {
    return this.comboSessionService.getComboRevenueById(+id);
  }
}
