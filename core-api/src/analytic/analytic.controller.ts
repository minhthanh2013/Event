import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AnalyticService } from './analytic.service';
import { Analytic } from './models/analytic.interface';

@Controller('analytic')
export class AnalyticController {
  constructor(private analyticService: AnalyticService) {}

  @Get()
  findAll(): Observable<Analytic[]> {
    return this.analyticService.findAllAnalytics();
  }

  @Post()
  create(@Body() analytic: Analytic): Observable<Analytic> {
    return this.analyticService.createAnalytic(analytic);
  }
}
