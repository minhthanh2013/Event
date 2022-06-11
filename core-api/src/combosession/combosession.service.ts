import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';
import { ComboSessionEntity } from './models/combo_session.entiy';
import { ComboSession } from './models/combo_session.interface';

@Injectable()
export class CombosessionService {
  constructor(
    @InjectRepository(ComboSessionEntity)
    private readonly comboSessionRepository: Repository<ComboSessionEntity>,
  ) {}

  findAllSessions(): Observable<ComboSession[]> {
    return from(this.comboSessionRepository.find());
  }
  createSession(comboSession: ComboSession): Observable<ComboSession> {
    return from(this.comboSessionRepository.save(comboSession));
  }
}
