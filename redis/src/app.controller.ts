import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateAuthDto } from './create.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @EventPattern('user_created')
  handleCreateUser(data: CreateAuthDto) {
    console.log('here in redis')
  }
}
