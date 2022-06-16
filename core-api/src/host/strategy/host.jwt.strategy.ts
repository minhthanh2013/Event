/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { HostEntity } from '../models/host.entity';

@Injectable()
export class HostJwtStrategy extends PassportStrategy(Strategy, 'host-jwt') {
  constructor(
    config: ConfigService,
    @InjectRepository(HostEntity)
    private readonly hostRepository: Repository<HostEntity>
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('HOST_JWT_SECRET'),
    });
  }

  async validate(payload: { sub: number; username: string; role: string }) {
    if (payload.role != null && payload.role != 'user') {
      throw new UnauthorizedException('Unauthorized');
    }
    const host = await this.hostRepository.findOne({
      where: {
        host_id: payload.sub,
      },
    });
    delete host.password;
    return host;
  }
}
