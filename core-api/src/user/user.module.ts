/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserJwtStrategy } from './strategy/user.jwt.strategy';

@Module({
  // imports: [TypeOrmModule.forFeature([UserEntity])],

  imports: [
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('USER_JWT_SECRET'),
        signOptions: { expiresIn: '10000s' },
      }),
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UserService, UserJwtStrategy],
  controllers: [UserController],
})
export class UserModule {}
