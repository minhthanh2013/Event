/* eslint-disable prettier/prettier */
import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import * as argon from 'argon2';
import { Repository } from 'typeorm';
import { HostEntity } from './models/host.entity';
import { Host } from './models/host.interface';
import { HostAuthDto } from './dto/host.auth';

@Injectable()
export class HostService {
  constructor(
    @InjectRepository(HostEntity)
    private readonly hostRepository: Repository<HostEntity>,
    private jwt: JwtService,
  ) {}

  findAllHosts(): Observable<Host[]> {
    return from(this.hostRepository.find());
  }
  findOne(id: number): Observable<Host> {
    return from(this.hostRepository.findOne({where: {host_id: id}}));
  }
  async signinHost(dto: HostAuthDto) {
    console.log(27, "Here")
       // find the user by email
       const host = await this.hostRepository.findOne({
        where: {
            user_name: dto.username,
        },
    });
    // if user does not exist throw exception
    if(!host) 
        throw new ForbiddenException(
            'Creadentials incorrect',
        );
    // compare password
    const pwMatches = await argon.verify(
        host.password,
        dto.password,
    );
    // if password incorrect throw exception
    if(!pwMatches) 
        throw new ForbiddenException(
            'Creadentials incorrect',
        );

    return this.signToken(host.host_id, host.user_name, 'host');
  }

  async createHost(host: Host) {
    if (await this.hostRepository.findOne({where: {user_name: host.user_name}})) {
      throw new ConflictException('Username already exists');
    }
    const hash = await argon.hash(host.password);
    host.password = hash;
    const tempHost = await this.hostRepository.save(host);
    return this.signToken(tempHost.host_id, tempHost.user_name, 'host');
  }

  async signToken(userId: number, username: string, role: string): Promise<{access_token: string}> {
    const payload = {
        sub: userId,
        username,
        role,
    }

    
    const token = await this.jwt.signAsync(
        payload,
    );

    return {
        access_token: token,
    } 
}
}
