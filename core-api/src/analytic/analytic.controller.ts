/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AnalyticService } from './analytic.service';
import { Analytic } from './models/analytic.interface';

@Controller('analytic')
export class AnalyticController {
  constructor(private analyticService: AnalyticService) {}

  @Get()
  findAll(): Observable<Analytic[]> {
    return this.analyticService.findAllAnalytics();
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Observable<Analytic> {
    return this.analyticService.findOne(+id);
  }
  
  @Post()
  create(@Body() analytic: Analytic): Observable<Analytic> {
    return this.analyticService.createAnalytic(analytic);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() analytic: Analytic): Observable<UpdateResult> {
    return this.analyticService.update(+id, analytic);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Observable<DeleteResult> {
    return this.analyticService.remove(+id);
  }
}
