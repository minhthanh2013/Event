import {  Module } from '@nestjs/common';
import {  ZoomController } from './zoom.controller';
import {  ZoomService } from './zoom.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    })
  ],
  controllers: [ZoomController],
  providers: [ZoomService],
})
export class ZoomModule {}

