import { Body } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateAuthDto } from './user-dto/create.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createUser(@Body() dto: CreateAuthDto) {
    console.log(dto);
    return this.appService.createUser(dto);
  }

}
