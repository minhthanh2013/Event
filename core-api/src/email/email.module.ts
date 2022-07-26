/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';

@Module({
  imports: [ConfigModule],
  providers: [EmailService, ConfigService],
  controllers: [],
})
export class EmailModule {}