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
import { UserEntity } from '../models/user.entity';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'user-jwt') {
  constructor(
    config: ConfigService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
     ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('USER_JWT_SECRET'),
    });
  }

  async validate(payload: { sub: number; username: string; role: string }) {
    if (payload.role != null && payload.role != 'user') {
      throw new UnauthorizedException('Unauthorized');
    }
    const user = await this.userRepository.findOne({
      where: {
        user_id: payload.sub,
      },
    });
    delete user.password;
    return user;
  }
}
