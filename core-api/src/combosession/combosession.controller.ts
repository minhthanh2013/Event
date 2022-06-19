/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CombosessionService } from './combosession.service';
import { ComboSession } from './models/combo_session.interface';

@Controller('combosession')
export class CombosessionController {
  constructor(private comboSessionService: CombosessionService) {}
  @Get()
  findAll(): Observable<ComboSession[]> {
    return this.comboSessionService.findAllSessions();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<ComboSession> {
    return this.comboSessionService.findOne(+id);
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
