import { Module } from '@nestjs/common';
import { ZoomService } from './zoom.service';
import { ZoomController } from './zoom.controller';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [ZoomService],
  controllers: [ZoomController],
  imports: [
    ConfigModule,
    HttpModule
  ],
})
export class ZoomModule {}
