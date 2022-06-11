import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
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
}
