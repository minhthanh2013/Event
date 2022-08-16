import { HostEntity } from 'src/host/models/host.entity';
import { SpeakerEntity } from 'src/speaker/models/speaker.entity';
/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminEntity } from './models/admin.entity';
import { AdminJwtStrategy } from './strategy/admin.jwt.strategy';
import { ConferenceEntity } from './../conference/models/conference.entity';
import { HttpModule } from '@nestjs/axios';
import { EmailService } from 'src/email/email.service';
import { ComboSessionEntity } from 'src/combosession/models/combo_session.entity';

@Module({
  imports: [
    HttpModule,
    forwardRef(() => AdminModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('ADMIN_JWT_SECRET'),
        signOptions: { expiresIn: '10000s' },
      }),
    }),
    TypeOrmModule.forFeature([AdminEntity, ConferenceEntity, SpeakerEntity, ComboSessionEntity, HostEntity])
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminJwtStrategy, EmailService],
})
export class AdminModule {}
