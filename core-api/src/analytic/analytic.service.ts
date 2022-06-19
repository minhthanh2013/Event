/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { AnalyticEntity } from './models/analytic.entity';
import { Analytic } from './models/analytic.interface';

@Injectable()
export class AnalyticService {
  constructor(
    @InjectRepository(AnalyticEntity)
    private readonly analyticRepository: Repository<AnalyticEntity>,
  ) {}

  findAllAnalytics(): Observable<Analytic[]> {
    return from(this.analyticRepository.find());
  }

  createAnalytic(analytic: Analytic): Observable<Analytic> {
    return from(this.analyticRepository.save(analytic));
  }

  findOne(id: number): Observable<Analytic> {
    return from(this.analyticRepository.findOne({where: {analytic_id: id}}));
  }

  update(id: number, analytic: Analytic): Observable<UpdateResult> {
    return from(this.analyticRepository.update(id, analytic));
  }

  remove(id: number): Observable<DeleteResult> {
    return from(this.analyticRepository.delete(id));
  }
}
