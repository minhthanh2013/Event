/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  imports: [ConfigModule],
  providers: [EmailService, ConfigService],
  controllers: [EmailController],
})
export class EmailModule {}