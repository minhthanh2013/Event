/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { HostService } from './host.service';
import { HostController } from './host.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HostEntity } from './models/host.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HostJwtStrategy } from './strategy/host.jwt.strategy';

@Module({
  imports: [
    forwardRef(() => HostModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('HOST_JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRE_TIME') },
      }),
    }),
    TypeOrmModule.forFeature([HostEntity]),
  ],
  providers: [HostService, HostJwtStrategy],
  controllers: [HostController],
})
export class HostModule {}
