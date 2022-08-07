/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ResponseData } from 'src/responsedata/response-data.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CombosessionService } from './combosession.service';
import { ComboSessionDto } from './models/combo_session.dto';
import { ComboSession } from './models/combo_session.interface';

@Controller('combosession')
export class CombosessionController {
  constructor(private comboSessionService: CombosessionService) {}
  // Note: This is a temporary solution to get the data from the database.
  @Get(":id")
  getCombo(@Param('id') comboId: number): Promise<ResponseData> {
    return this.comboSessionService.findAllSessionsBySessionId(comboId);
  }

  @Get()
  findAll(): Observable<ComboSession[]> {
    return this.comboSessionService.findAllSessions();
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
}
