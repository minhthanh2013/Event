/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { ResponseData } from 'src/responsedata/response-data.dto';
import { ConferencecategoryService } from './conferencecategory.service';

@Controller('conferencecategory')
export class ConferencecategoryController {
  constructor(private conferenceCategoryService: ConferencecategoryService) {}

  @Get('/get-all')
  findAll(): Observable<ResponseData> {
    return from(this.conferenceCategoryService.findAllConferenceCategories());
  }
}
