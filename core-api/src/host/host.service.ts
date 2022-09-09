/* eslint-disable prettier/prettier */
import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import * as argon from 'argon2';
import { Repository } from 'typeorm';
import { HostEntity } from './models/host.entity';
import { Host, HostResponseDto } from './models/host.interface';
import { HostAuthDto } from './dto/host.auth';
import { ResponseData } from 'src/responsedata/response-data.dto';

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
  async findOne(id: number): Promise<HostResponseDto> {
    const host = await this.hostRepository.findOne({where: {host_id: id}});
    delete host.password;
    const response: HostResponseDto =  {} as HostResponseDto;
    response.host_id = host.host_id;
    response.user_name = host.user_name;
    response.email = host.email;
    response.firstName = host.first_name;
    response.lastName = host.last_name;
    response.update_at = host.update_at;
    response.host_type = host.host_type;
    return response;
  }
  async signinHost(dto: HostAuthDto) {
       // find the user by email
    const host = await this.hostRepository.findOne({
        where: {
            user_name: dto.username,
        },
    });
    if(host.host_type === "ban") {
      throw new ForbiddenException(
        'You are banned from this service',
    );
    }
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
    if (await this.hostRepository.findOne({where: {email: host.email}})) {
      throw new ConflictException('Email already exists');
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
async updateHost(id: number, host: HostResponseDto): Promise<ResponseData> {
  const response = new ResponseData()
  const currentHost = await this.hostRepository.findOne({where: {host_id: id}});
  const email = currentHost.email;
  if(email !== host.email) {
      const checkHost = await this.hostRepository.findOne({where: {email: host.email}});
      if(checkHost) {
          response.status = false;
          response.data = 'Email already exists';
          return response;
      }
  }
  const data = await this.hostRepository.createQueryBuilder()
  .update(HostEntity)
  .set({ email: host.email,
      first_name: host.firstName,
      last_name: host.lastName})
  .where("host_id = :id", { id: id })
  .execute()
  response.status = data.affected === 1 || data.affected === 2 || data.affected === 3;
  response.data = null;
  return response;
}
}
