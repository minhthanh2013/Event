import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { HostService } from './host.service';
import { Host } from './models/host.interface';

@Controller('host')
export class HostController {
  constructor(private hostService: HostService) {}

  @Get()
  findAll(): Observable<Host[]> {
    return this.hostService.findAllHosts();
  }

  @Post()
  create(@Body() host: Host): Observable<Host> {
    return this.hostService.createHost(host);
  }
}
