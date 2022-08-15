/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
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
}
