import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { HostEntity } from './models/host.entity';
import { Host } from './models/host.interface';

@Injectable()
export class HostService {
  constructor(
    @InjectRepository(HostEntity)
    private readonly hostRepository: Repository<HostEntity>,
  ) {}

  findAllHosts(): Observable<Host[]> {
    return from(this.hostRepository.find());
  }

  createHost(host: Host): Observable<Host> {
    return from(this.hostRepository.save(host));
  }
}
