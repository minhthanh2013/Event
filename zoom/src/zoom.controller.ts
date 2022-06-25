import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
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
}