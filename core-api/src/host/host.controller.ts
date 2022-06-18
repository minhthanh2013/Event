/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { HostAuthDto } from './dto/host.auth';
import { HostJwtGuard } from './guard/host.jwt.guard';
import { HostService } from './host.service';
import { Host } from './models/host.interface';

@Controller('host')
@UseGuards(HostJwtGuard)
export class HostController {
  constructor(private hostService: HostService) {}

  @Get()
  findAll(): Observable<Host[]> {
    return this.hostService.findAllHosts();
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
