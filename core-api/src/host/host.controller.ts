/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ResponseData } from 'src/responsedata/response-data.dto';
import { HostAuthDto } from './dto/host.auth';
import { HostJwtGuard } from './guard/host.jwt.guard';
import { HostService } from './host.service';
import { Host, HostResponseDto } from './models/host.interface';

@Controller('host')
export class HostController {
  constructor(private hostService: HostService) {}

  @Get()
  @UseGuards(HostJwtGuard)
  findAll(): Observable<Host[]> {
    return this.hostService.findAllHosts();
  }
  @Get(':id')
  @UseGuards(HostJwtGuard)
  findOne(@Param('id') id: string): Promise<HostResponseDto> {
    return this.hostService.findOne(+id);
  }
  @Post('signup')
  create(@Body() host: Host) {
    return this.hostService.createHost(host);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signinUser(@Body() dto: HostAuthDto) {
    return this.hostService.signinHost(dto);
  }
  @Put(':id')
  @UseGuards(HostJwtGuard)
  updateHost(@Param('id') id: string, @Body() host: HostResponseDto): Promise<ResponseData> {
    return this.hostService.updateHost(+id, host);
  }
}
