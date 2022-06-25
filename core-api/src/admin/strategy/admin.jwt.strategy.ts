/* eslint-disable prettier/prettier */
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { AdminEntity } from '../models/admin.entity';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor(
    config: ConfigService,
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
     ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('ADMIN_JWT_SECRET'),
      
    });
  }

  async validate(payload: { sub: string; username: string; role: string }) {
    if (payload.role != null && payload.role != 'admin') {
      throw new UnauthorizedException('Unauthorized');
    }
    const user = await this.adminRepository.findOne({
      where: {
        admin_id: payload.sub,
      },
    });
    delete user.password;
    return user;
  }
}
