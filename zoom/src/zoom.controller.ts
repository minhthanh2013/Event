import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { ZoomService } from './zoom.service';
import { ConfigService } from '@nestjs/config';
import { CreateSignature } from './dto/create.signature';
import { ZoomDto } from './dto/zoom.dto';

@Controller('zoom')
export class ZoomController {
  constructor(private readonly zoomService: ZoomService, private readonly config: ConfigService) {}
  
  @Post()
  createSignature(@Body() createSignature: CreateSignature) {
      return this.zoomService.generateSignature(createSignature);
  }

  @MessagePattern({ cmd: 'DOWNLOAD_RECORD' })
  downloadFile(zoomDto: ZoomDto) {
    const url = zoomDto.downloadUrl;
    return this.zoomService.downloadFile(url, "/usr/src/app/resources/conference-"+zoomDto.zoomMeetingId+"-record.mp4");
  } 
}
