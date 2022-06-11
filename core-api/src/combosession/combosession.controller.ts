import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CombosessionService } from './combosession.service';
import { ComboSession } from './models/combo_session.interface';

@Controller('combosession')
export class CombosessionController {
  constructor(private comboSessionService: CombosessionService) {}
  @Get()
  findAll(): Observable<ComboSession[]> {
    return this.comboSessionService.findAllSessions();
  }

  @Post()
  create(@Body() comboSession: ComboSession): Observable<ComboSession> {
    return this.comboSessionService.createSession(comboSession);
  }
}
