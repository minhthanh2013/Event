import { Module } from '@nestjs/common';
import { ZoomService } from './zoom.service';
import { ZoomController } from './zoom.controller';

@Module({
  providers: [ZoomService],
  controllers: [ZoomController]
})
export class ZoomModule {}
