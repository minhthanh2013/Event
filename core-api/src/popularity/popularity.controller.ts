import { Body, Controller, Post } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { ResponseData } from 'src/responsedata/response-data.dto';
import { PopularityDto } from './Model/popularity.dto';
import { PopularityService } from './popularity.service';

@Controller('popularity')
export class PopularityController {
  constructor(private readonly popularityService: PopularityService) {}

  @Post('/add-popular')
    checkAddPopular(@Body() dto: PopularityDto): Observable<ResponseData> {
    return from(this.popularityService.checkUnique(dto));
  }
}
