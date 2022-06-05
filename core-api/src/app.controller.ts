import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateAuthDto } from './user-auth/dto/create.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Post()
  // handleCreateUser(@Body() dto: CreateAuthDto) { 
  //   this.appService.handleCreateUser(dto);
  // }

}
