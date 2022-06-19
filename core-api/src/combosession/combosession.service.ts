/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
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
  findOne(id: number): Observable<ComboSession> {
    return from(this.comboSessionRepository.findOne({where: {combo_id: id}}));
  }
  createSession(comboSession: ComboSession): Observable<ComboSession> {
    return from(this.comboSessionRepository.save(comboSession));
  }
  update(id: number, comboSession: ComboSession): Observable<UpdateResult> {
    return from(this.comboSessionRepository.update(id, comboSession));
  }
  remove(id: number): Observable<DeleteResult> {
    return from(this.comboSessionRepository.delete(id));
  }
}
