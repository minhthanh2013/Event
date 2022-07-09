import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { ZoomService } from './zoom.service';
import { ConfigService } from '@nestjs/config';
import { CreateSignature } from './dto/create.signature';

@Controller('zoom')
export class ZoomController {
  constructor(private readonly zoomService: ZoomService, private readonly config: ConfigService) {}
  
  @Post()
  createSignature(@Body() createSignature: CreateSignature) {
      return this.zoomService.generateSignature(createSignature);
  }

  @MessagePattern({ cmd: 'DOWNLOAD_RECORD' })
  downloadFile() {
    console.log('ZoomController: download record')
    const url = "https://us06web.zoom.us/rec/download/7AqkPslGTcYi1NkdDbiLAGzYZ3TsFwG6z6IwuWZjJOD9it4n9WAnmfb6yHjSSFAtD-B1BTZ3uofMZ9RE.ZyqC3x4ENLzQujLC";
    return this.zoomService.downloadFile(url, "./src/records/zoom.mp4");
  } 
}
